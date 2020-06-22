const cors = require('cors');
const express = require('express');
const todoRouter = require('./todoRouter');

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/todos", todoRouter)


app.get("/", (req, res, next) => {
    res.send("Hello!");
})

app.listen(port);
