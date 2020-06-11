const cors = require('cors');
const express = require('express');
const todoRouter = require('./todoRouter');

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/todos", todoRouter)


app.get("/", (req, res, next) => {
    res.send("Hello!");
})

app.listen(port);

/* makeUser = async () => {
    const user = await db.User.create({username: "phil", pwd_hash: "moo", salt: "figs"});
    console.log("Phil's auto-generated ID:", user.id);

    makeTodo(user.id)

}

makeTodo = async (user_id) => {
    let todo = await db.Todo.create({ todo: "Eat Lunch", user_id})

    
    try {
        todo = await db.Todo.findOne({
        where: { id: todo.id },
        include: 'user' 
        })
     } catch (error){
        console.log(error)
    }

    console.log(todo)


    console.log("Task Id: ", todo.id);
    console.log("Task user:", todo.user.username )
}

makeUser();
//db.User.findAll().then(users => {
//    users.forEach(user => console.log(user.username))
//})

*/


