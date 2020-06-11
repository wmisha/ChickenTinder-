const express = require('express');
const router = express.Router();

router.use(express.json());

const db = require(__dirname + '/models/index.js');

const { bodyHasNewTodoValidator, idToDatabaseEntityValidator, tryCatchMiddleware } = require('./validators.js');

router.use(tryCatchMiddleware);

router.get("/", (req, res) => {
    db.Todo.findAll({include: 'user'}).then((todos) => {
        const results = todos.reduce((acc, next) => {
            const name = next.user ? next.user.username : "NO_USER";

            acc[name] = acc[name] || [];
            const {id, todo} = next;
            acc[name].push({id, todo});
            return acc;
        }, {});

        // leave the option open to filter by user
        //res.send(results);
        res.send(results["NO_USER"].sort(x => x.id));
    })
})

router.post("/", bodyHasNewTodoValidator, async (req, res) => {
    console.log(req.body);
    const todo = req.body.todo;

    const result = await db.Todo.create({todo});
    console.log(result);

    res.send(result);
})

router.get("/:id", idToDatabaseEntityValidator, async ({todo}, res) => {
    res.send(todo);
})


router.put("/:id", 
           bodyHasNewTodoValidator,
           idToDatabaseEntityValidator,
           async (req, res) => {

    const todo = req.body.todo;

    req.todo.set({todo});
    req.todo.save();
    res.send(req.todo);
})

router.delete("/:id", idToDatabaseEntityValidator, async (req, res) => {
    const item = req.todo;
    await req.todo.destroy();
    res.send(item);
})

module.exports = router;