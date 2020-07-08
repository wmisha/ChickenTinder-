const express = require('express');
const router = express.Router();
const { API_KEY }  = require('./secret_data')

const axios = require('axios').default
// const queryString = require('query-string')
const endPoint = "http://api.yelp.com/v3/businesses/search"
const { map, pick } = require('ramda');
const generateJoinCode = require('./generateJoinCode')
const addRestaurants = require('./addRestaurants');

router.use(express.json());

const db = require(__dirname + '/models/index.js');

const { bodyHasProp, tryCatchMiddleware, authorizeJWT } = require('./middleware.js');

router.use(tryCatchMiddleware);
router.use(authorizeJWT);

router.get("/", (req, res) => res.send("Groups Router"))

const Chance = require('chance')
const chance = new Chance();

router.post("/", bodyHasProp('group_name', 'location'), async (req, res) => {
    const {group_name, location } = req.body;

    const parameters = { location: req.body.location }

    if (req.body.term){
        parameters.term = req.body.term;
    }

    try {
        const group = await db.Group.create({
            group_name,
            owner_id: req.user_id,
            location,
            join_code: await generateJoinCode(),
            Disactive: false
        })

        addRestaurants(group.id, parameters)
        res.send({ ... group, addedRestaurants: true } );
    } catch (err) {
        res.status(400).send({ error: err.message })
    }

})

// const request = `${endPoint}?${queryString.stringify(arguments)}` 
// axios.get(request, {
//     headers: {
//         authorization: `Bearer ${API_KEY}`
//     }
// })
// .then(response => response.data.businesses)
// .then(console.log)
// .catch(error => {});
module.exports = router;