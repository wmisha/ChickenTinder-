const cors = require('cors');
const express = require('express');
const todoRouter = require('./todoRouter');
const authenticationRouter = require('./authenticationRouter')

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/todos", todoRouter)
app.use("/auth", authenticationRouter)

app.get("/", (req, res, next) => {
    res.send("Hello!");
})

app.listen(port);
