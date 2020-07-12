const cors = require('cors');
const express = require('express');
const axios = require('axios').default;
const todoRouter = require('./routers/todoRouter');
const authenticationRouter = require('./routers/authenticationRouter')
const groupRouter = require('./routers/groupRouter');
const restaurantVoteRouter = require('./routers/restaurantVoteRouter');32

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/todos", todoRouter)
app.use("/auth", authenticationRouter)
app.use("/groups", groupRouter);
app.use("/restaurants", restaurantVoteRouter);

app.get("/", (req, res, next) => {
    res.send("Hello!");
})

app.listen(port);
