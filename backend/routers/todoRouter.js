const express = require('express');
const router = express.Router();

router.use(express.json());

const db = require('../models/index.js');

const { bodyHasProp, tryCatchMiddleware, authorizeJWT } = require('../helpers/middleware.js');

router.use(tryCatchMiddleware);
router.use(authorizeJWT);

router.get("/", (req, res) => {
    db
      .TodoList
      .findAll({where: {user_id: req.user_id},  order: [['name', 'DESC']]})
      .then(lists => {
          res.send(lists)
    })
})

router.post("/", bodyHasProp('name'), async (req, res) => {
    console.log('posting');
    console.log(req.body);
    const name = req.body.name;

    const result = await db.TodoList.create({ name, user_id: req.user_id } );
    console.log(result);

    res.send(result);
})


router.param('list_id', async (req, res, next, id) => {
    id = parseInt(id)

    if (!id) {
        res.status(400).send({ error: "No id in params!" });
    } else {
        const listExists = await db.TodoList.findOne({where: {id}})
        const result = await db.Todo.findAll({where: {todo_list_id: id}});


        if (!listExists) {
            res.status(400).send({ error: "id not found in db!" });
        } else if (listExists.user_id != req.user_id) {
            res.status(400).send({ error: "Not authorized here!" });
        } else {
            req.listObject = listExists;
            req.list = result;
            next();
        }
    }
})

router.param('todo_id', async (req, res, next, id) => {
    id = parseInt(id);

    if (!id) {
        res.status(400).send({ error: "No id in params!" });
    } else {
        const result = await db.Todo.findOne({ where: { id }, include: ['list', db.User] });


        if (!result) {
            res.status(400).send({ error: "id not found in db!" });
        } else if (result.list.user_id !== req.user_id) {
            res.status(400).send({ error: "Not authorized here!" });
        } else {
            console.log('Result user id', result.list.user_id)
            console.log('Request user id', req.user_id)
            req.todo = result;
            next();
        }
    }
})

router.get("/:list_id", async (req, res) => {
    res.send(req.list);
})

router.put("/:list_id", bodyHasProp('name'),async (req, res) => {


    const name = req.body.name;

    req.listObject.set({name});
    req.listObject.save();
    res.send(req.listObject);
})

router.delete("/:list_id", async (req, res) => {
    req.list.forEach(item => item.destroy());
    
    const item = req.listObject;
    await req.listObject.destroy();
    res.send(item);
})

router.post("/:list_id/", bodyHasProp('todo'),  (req, res) => {
    db
      .Todo
      .create({todo: req.body.todo, todo_list_id: req.params.list_id, user_id: req.user_id })
      .then(result => res.send(result))
})

router.put("/:list_id/:todo_id", bodyHasProp('todo'), async (req, res) => {
    req.todo.set({ todo: req.body.todo });
    req.todo.save();
    res.send(req.todo);
})

router.delete("/:list_id/:todo_id", async (req, res) => {
    const item = req.todo;
    await req.todo.destroy();
    res.send(item);
})

module.exports = router;