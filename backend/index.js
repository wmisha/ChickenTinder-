const cors = require('cors');
const express = require('express');
const axios = require('axios').default;
const todoRouter = require('./todoRouter');
const authenticationRouter = require('./authenticationRouter')
const groupRouter = require('./groupRouter');

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/todos", todoRouter)
app.use("/auth", authenticationRouter)
app.use("/groups", groupRouter);

app.get("/", (req, res, next) => {
    res.send("Hello!");
})

app.listen(port);
