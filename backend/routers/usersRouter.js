const express = require('express');
const router = express.Router();

router.use(express.json());

//const db = require(__dirname + '../models/index.js');
console.log(__dirname);
const db = require('../models/index.js');

const { bodyHasProp, tryCatchMiddleware, authorizeJWT } = require('../middleware.js');

const group = require('../models/group');

router.use(tryCatchMiddleware);
router.use(authorizeJWT);



// Route to see all groups that a user is in.
router.get("/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
    const results = await db.UserGroup.findAll({ where: { user_id: user_id } });
    //console.log(results);
    if (results.length === 0) {
        res.send("You haven't join any group yet!");
    } else {
        var Op = db.Sequelize.Op;
        db.Group.findAll({
            where: {
                id: {
                    [Op.in]: results.map(results => results.group_id)
                }
            }
        }).then(results => res.send(results))
    }


})

// Route to a user join a group
// my qustion is should deal with group invite code? what is the request parameters.

router.post("/:join_code", async (req, res) => {
    const { join_code } = req.params;
    const user_id = req.user_id;

    const group = await db.Group.findOne({ where: { join_code: join_code } });
    db.UserGroup.create({
        user_id,
        group_id: group.id
    })
        .then(result => res.send(result)) // copy from you not sure it works???
        .catch(err => console.log(err));


})


// Route to leave a group;

router.delete("/:group_id", async (req, res) => {
    const group_id = req.params.group_id;
    const user_id = req.user_id;
    db.UserGroup.destroy({
        where: {
            group_id: group_id,
            user_id: user_id
        }
    })
        .then(res.send("Sucessfully left this group"))
        .catch(err => console.log(err));
})

module.exports = router;