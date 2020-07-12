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

    //res.send(req.params);
    //return ;
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
          //res.send({lists})
          res.send({size: lists.length});
          //res.send(rea.lists.length);
    })
})

router.param('restaurant_id', async (req, res, next, id) => {
    id = parseInt(id)

    if (!id) {
        res.status(400).send({ error: "No id in params!" });
    } else {
        const restaurantExists = await db.RestaurantVote.findAll({where: {id}})
        //const result = await db.Todo.findAll({where: {todo_list_id: id}});


        if (!restaurantExists) {
            res.status(400).send({ error: "restaurant id not found in db!" });
        } else {
            //eq.listObject = listExists;
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

// router.get("/:group_id", async (req, res) => {
//     res.send(req.groupList);
// })

// router.param('group_id', async (req, res, next, id) => {
//     id = parseInt(id)

//     if (!id) {
//         res.status(400).send({ error: "No id in params!" });
//     } else {
//         const groupExists = await db.Group.findOne({where: {id}})
//         const result = await db.Restaurant.findAll({where: {group_id: id}});

//         if (!groupExists) {
//             res.status(400).send({ error: "id not found in db!" });
//         } else {
//             req.groupObject = groupExists;
//             req.groupList = result;
//             next();
//         }
//     }
// })

module.exports = router;