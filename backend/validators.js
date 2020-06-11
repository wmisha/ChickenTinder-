const db = require(__dirname + '/models/index.js');


const bodyHasNewTodoValidator = async (req, res, next) => {
    const todo = req.body.todo;

    if (!todo){
        res.status(400).send({error: "No todo!"});
    } else {
        next();
    }
}

const idToDatabaseEntityValidator = async (req, res, next) => {
    const id = req.params.id;

    if (!id){
        res.status(400).send({ error: "No id in params!"});
    } else {
        const result = await db.Todo.findOne({ where: { id }, include: 'user'});

        if (!result){
            res.status(400).send({ error: "id not found in db!" });
        } else if (result.user){
            res.status(400).send({ error: "Not authorized here!"});
        } else {
            req.todo = result;
            next();
        }
    }
}

const tryCatchMiddleware = async (req, res, next) => {
    try {
        next();
    } catch (err){
        console.log(err);
    }
}

module.exports = {
    bodyHasNewTodoValidator,
    idToDatabaseEntityValidator,
    tryCatchMiddleware
}