const cors = require('cors');
const express = require('express');
const todoRouter = require('./routers/todoRouter');
const authenticationRouter = require('./routers/authenticationRouter')
const groupRouter = require('./routers/groupRouter');
const usersRouter = require('./routers/usersRouter');
const port = process.env.PORT || 5000;
const app = express();


app.use(cors());
app.use(express.json());
app.use("/todos", todoRouter)
app.use("/auth", authenticationRouter)
app.use("/groups", groupRouter);
app.use("/users", usersRouter);


app.get("/", (req, res, next) => {
    res.send("Hello!");
})

app.listen(port);
