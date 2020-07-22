const express = require('express')
const router = express.Router()

const { Op } = require('sequelize')

router.use(express.json())

const db = require('../models/index.js')

const { bodyHasProp, tryCatchMiddleware, authorizeJWT } = require('../helpers/middleware.js')

router.use(tryCatchMiddleware)
router.use(authorizeJWT)

router.get('/', (req, res) => {
    db.RestaurantVote.findAll({
        attributes: ['vote', [db.sequelize.fn('count', 'vote'), 'count']],
        include: [{
            model: db.Restaurant,
            as: 'Restaurant',
            attributes: ['name']
        }],
        group: ['vote', 'Restaurant.name', 'Restaurant.id']
    })
        .then(lists => {
            if (lists.length < 1) {
                res.send([])
            }
            const response = {}
            lists.forEach(list => {
                if (list.Restaurant && list.Restaurant.name){
                    response[list.Restaurant.name] = response[list.Restaurant.name] || {
                        name : list.Restaurant.name, yes: 0, no: 0
                    };

                    if (list.vote) {
                        response[list.Restaurant.name].yes = +list.dataValues.count
                    } else {
                        response[list.Restaurant.name].no = +list.dataValues.count
                    }
                }
            })
            res.send(response)
        })
})

router.get('/:restaurant_id', (req, res) => {
  db.RestaurantVote.findAll({
    attributes: ['vote', [db.sequelize.fn('count', 'vote'), 'count']],
    include: [{
      model: db.Restaurant,
      as: 'Restaurant',
      attributes: ['name']
    }],
    where: {
      [Op.and]: {
        restaurant_id: req.params.restaurant_id
      }
    },
    group: ['vote', 'Restaurant.name', 'Restaurant.id']
  })
    .then(lists => {
      if (lists.length < 1) {
        res.send([])
      }
      const response = {
        name: lists[0].Restaurant.name,
        yes: 0,
        no: 0
      }

      lists.forEach(list => {
        if (list.vote) {
          response.yes = +list.dataValues.count
        } else {
          response.no = +list.dataValues.count
        }
      })
      res.send(response)
    })
})

router.param('restaurant_id', async (req, res, next, id) => {
  id = parseInt(id)

  if (!id) {
    res.status(400).send({ error: 'No id in params!' })
  } else {
    const restaurantExists = await db.RestaurantVote.findAll({ where: { id } })

    if (!restaurantExists) {
      res.status(400).send({ error: 'restaurant id not found in db!' })
    } else {
      req.list = restaurantExists
      next()
    }
  }
})

router.post('/:restaurant_id', bodyHasProp('vote'), async (req, res) => {
  const { restaurant_id } = req.params
  const user_id = req.user_id

  const previousVote = await db.RestaurantVote.findOne({
    where: { restaurant_id, user_id }
  })

  if (previousVote) {
    res.status(400).send({ error: 'User already voted!' })
  } else {
    try {
      const restaurantVote = await db.RestaurantVote.findOrCreate({
        where: {
          restaurant_id: restaurant_id,
          user_id: req.user_id,
          vote: req.body.vote
        }

      })
      res.send(restaurantVote)
    } catch (err) {
      res.status(400).send({ error: err.message })
    }
  }
})

module.exports = router
