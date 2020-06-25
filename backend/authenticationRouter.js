const express = require('express');
const router = express.Router();

router.use(express.json());

const db = require(__dirname + '/models/index.js');

const { bodyHasProp, tryCatchMiddleware } = require('./validators.js');

router.use(tryCatchMiddleware);

router.post("/login", bodyHasProp('username', 'password'), (req, res) => {
    // check the database to find the user
    // if the user isnt in the database, send back an error
    //   otherwise, take the user's salt. hash their password with the salt,
    //   if the H<password || salt> does not match User.pwd_hash
    //      send back and error
    //   else
    //     login:
    //         make a JWT lkjlksdjflkdsj.sldkjfslkdjdslkfj.lsdkjfslkfj
})

router.post("/register", (req, res) => {
    // check the database to find the user
    // if the user DOES EXIST, send back and error
    // otherwise, store username: username, salt: N, pwd_hash: H<password || salt> in the table
})

module.exports = router;