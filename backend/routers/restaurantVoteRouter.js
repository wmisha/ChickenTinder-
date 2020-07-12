const express = require('express');
const router = express.Router();

const { map, pick } = require('ramda');
const addRestaurants = require('../helpers/addRestaurants');
const { Op } = require("sequelize");

router.use(express.json());

const db = require('../models/index.js');

const { bodyHasProp, tryCatchMiddleware, authorizeJWT } = require('../helpers/middleware.js');

router.use(tryCatchMiddleware);
router.use(authorizeJWT);

router.get("/", (req, res) => res.send("Restaurants Router"))

router.get("/:restaurant_id", (req, res) => {

    db.RestaurantVote.findAll({
        attributes: ['user_id'],
        where: {
          [Op.and]: {
              restaurant_id: req.params.restaurant_id,
              vote: true
          }
        },
        group: ['user_id']
    
    })
      .then(lists => {
          console.log(lists);
          console.log(lists.length);
          res.send({size: lists.length});
    })
})

router.param('restaurant_id', async (req, res, next, id) => {
    id = parseInt(id)

    if (!id) {
        res.status(400).send({ error: "No id in params!" });
    } else {
        const restaurantExists = await db.RestaurantVote.findAll({where: {id}})

        if (!restaurantExists) {
            res.status(400).send({ error: "restaurant id not found in db!" });
        } else {
            req.list = restaurantExists;
            next();
        }
    }
})

router.post("/:restaurant_id", bodyHasProp('restaurant_id'), async (req, res) => {
    const { restaurant_id } = req.body;
    const user_id = req.user_id;

    if (!user_id){
        res.status(400).send({ error: "User not found!"});
    } else if (restaurant_id && user_id){
        res.status(400).send({ error: "User already voted!"});
    } else {
        try {
            const restaurantVote = await db.RestaurantVote.findOrCreate({
                restaurant_id: req.body.restaurant_id,
                user_id: req.user_id,
                vote: req.body.vote
            })
    
            res.send(restaurantVote);
    
        } catch (err) {
            res.status(400).send({ error: err.message })
        }
    }

})


module.exports = router;