const express = require('express');

// For sending back the auth token, which must be a JWT, rather than a cookie
const jwt = require('jsonwebtoken');

// for hashing the password
const crypto = require('crypto')

// for generating the SALT
const Chance = require('chance')
const chance = new Chance()


const router = express.Router();

const { SECRET } = require('../helpers/private.js');

router.use(express.json());

const db = require('../models/index.js');

const { bodyHasProp, tryCatchMiddleware } = require('../helpers/middleware.js');

router.use(tryCatchMiddleware);

function generatePwdHash(password, salt) {
    const hash = crypto.createHash('sha256');

    hash.update(`${password}${salt}`);
    const pwd_hash = hash.digest('hex');
    return pwd_hash;
}



router.post("/login", bodyHasProp('username', 'password'), async (req, res) => {
    // check the database to find the user
    // if the user isnt in the database, send back an error
    //   otherwise, take the user's salt. hash their password with the salt,
    //   if the H<password || salt> does not match User.pwd_hash
    //      send back and error
    //   else
    //     login:
    //         make a JWT lkjlksdjflkdsj.sldkjfslkdjdslkfj.lsdkjfslkfj
    const { username, password } = req.body;

    const user = await db.User.findOne({ where: { username } });

    if (!user) {
        res.status(400).send({ error: "User not found!" });
    } else if (generatePwdHash(password, user.salt) !== user.pwd_hash) {
        res.status(400).send({ error: "Incorrect password!" });
    } else {
        const accessToken = jwt.sign(
            { username, id: user.id },
            SECRET,
            { algorithm: 'HS256' }
        );
        res.send({ accessToken })
    }
})

router.post("/register", bodyHasProp('username', 'password', 'confirmPassword'), async (req, res) => {
    // check the database to find the user
    // if the user DOES EXIST, send back and error
    // otherwise, store username: username, salt: N, pwd_hash: H<password || salt> in the table
    const { username, password, confirmPassword } = req.body;

    const user = await db.User.findOne({ where: { username } });

    if (user) {
        res.status(400).send({ error: "User already exists!" });
    } else if (password !== confirmPassword) {
        res.status(400).send({ error: "Passwords must match!" });
    } else {
        console.log(user);
        const salt = chance.string({ length: 24 })
        const pwd_hash = generatePwdHash(password, salt);

        const newUser = await db.User.create({ username, pwd_hash, salt });
        res.send(newUser);
    }

})

module.exports = router;