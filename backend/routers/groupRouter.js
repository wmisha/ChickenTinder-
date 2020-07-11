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

        addRestaurants(group.id, parameters)
        res.send({ ...group, addedRestaurants: true });
    } catch (err) {
        res.status(400).send({ error: err.message })
    }

})


router.get("/:group_id", async (req, res) => {
    res.send(req.groupList); // do not understand 
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