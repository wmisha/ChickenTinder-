const express = require('express');
const router = express.Router();
const generateJoinCode = require('../helpers/generateJoinCode')
const addRestaurants = require('../helpers/addRestaurants');

router.use(express.json());

const db = require('../models/index.js');
const { bodyHasProp, tryCatchMiddleware, authorizeJWT } = require('../helpers/middleware.js');

router.use(tryCatchMiddleware);
router.use(authorizeJWT);

router.get("/", (req, res) => res.send("Groups Router"))

const Chance = require('chance')
const chance = new Chance();

router.post("/", bodyHasProp('group_name', 'location'), async (req, res) => {
    const { group_name, location } = req.body;
    const parameters = { location: req.body.location }

    if (req.body.term) {
        parameters.term = req.body.term;
    }

    if (req.body.limit) {
        parameters.limit = req.body.limit;
    }

    try {
        const group = await db.Group.create({
            group_name,
            owner_id: req.user_id,
            location,
            join_code: await generateJoinCode(),
            Disactive: false
        })
        console.log(req.user)
        group.addUser(req.user);

        addRestaurants(group.id, parameters)
        res.send({ ...group, addedRestaurants: true });
    } catch (err) {
        res.status(400).send({ error: err.message })
    }

})


router.get("/:group_id", async (req, res) => {
    const result = await db.RestaurantVote.findAll({
        where: {
            user_id: req.user_id,
        }
    });

    res.send(req.groupList.filter(restaurant => {
        return !result.some(vote => {
            return vote.restaurant_id === restaurant.id
        })
    }));
})

router.get("/:group_id/votes", async (req, res) => {
    db.RestaurantVote.findAll({
        attributes: ['vote', [db.sequelize.fn('count', 'vote'), 'count']],
        include: [{
            model: db.Restaurant,
            as: 'Restaurant',
            attributes: ['name', 'group_id'],
        }],
        group: ['vote',
                'RestaurantVote.id',
                'Restaurant.name',
                'Restaurant.id',
                'Restaurant.group_id'  
            ],
    })
    .then(results => results.filter(result => 
        result.Restaurant && result.Restaurant.group_id == req.params.group_id)
    )
    .then(lists => {
        if (lists.length < 1) {
            res.send([])
        }
        const response = {}
        lists.forEach(list => {
            if (list.Restaurant && list.Restaurant.name) {
                response[list.Restaurant.name] = response[list.Restaurant.name] || {
                    name: list.Restaurant.name, yes: 0, no: 0
                };

                if (list.vote) {
                    response[list.Restaurant.name].yes = +list.dataValues.count
                } else {
                    response[list.Restaurant.name].no = +list.dataValues.count
                }
            }
        })
        res.send(response)
    }).catch(console.error)
})

router.param('group_id', async (req, res, next, id) => {
    id = parseInt(id)

    if (!id) {
        res.status(400).send({ error: "No id in params!" });
    } else {
        const groupExists = await db.Group.findOne({ where: { id } })
        const result = await db.Restaurant.findAll({ where: { group_id: id } });

        if (!groupExists) {
            res.status(400).send({ error: "id not found in db!" });
        } else {
            req.groupObject = groupExists;
            req.groupList = result;
            next();
        }
    }
})

module.exports = router;