import React, { Fragment, useState } from "react";

import './InputTodo.css'
const InputTodo = () => {

    const [description, setDescription] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body = { todo: description };
            const response = fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            console.log(await response);
            setDescription("");
        } catch (err){
            console.err(err.message);
        }
    }
    return (
        <Fragment>
            <h1 className="text-center mt-5">Pern Todo List</h1>

            <form className="theForm d-flex" onSubmit={onSubmitForm}>
                <input type="text" className="small form-control" value={description} onChange={e => {setDescription(e.target.value)}}/>
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>

    );
}

export default InputTodo;