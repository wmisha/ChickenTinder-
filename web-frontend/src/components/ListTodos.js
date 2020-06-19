import React, { Fragment, useEffect, useState } from "react";

import EditTodo from './EditTodo.js'
import './InputTodo.css'
const ListTodo = () => {

    const [todos, setTodos] = useState([]);

    const getTodos = async () => {
        try {
            const response = await fetch('http://localhost:5000/todos')
            const jsonData = await response.json();

            setTodos(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    }

    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });
            console.log(deleteTodo);
            setTodos(todos.filter(todo => todo.id !== id))

        } catch (err){
            console.log(err.message);
        }

    }

    useEffect(() => {
        getTodos();
    })

    return (
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th className="col-sm-5">Todo</th>
                        <th className="col-sm-2">Edit</th>
                        <th className="col-sm-2">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map(({id, todo}) => {
                            return <tr key={id}>
                                <td>{todo}</td>
                                <td><EditTodo todo={todo} id={id}/></td>
                                <td><button className="btn btn-danger" onClick={() => {deleteTodo(id)}}>Delete</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </Fragment>

    );
}

export default ListTodo;