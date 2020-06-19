import React, { Fragment, useState } from 'react';

const EditTodo = ({todo, id}) => {
    const [description, setDescription] = useState(todo);

    const updateDescription = async e => {
        e.preventDefault();

        try {
            const body = { todo: description };
            const response = await fetch(`http://localhost:5000/todos/${id}`, {
                method: 'PUT',
                headers: {"Content-Type": 'application/json'},
                body: JSON.stringify(body)
            })

            console.log(response);
            console.log(body);
        } catch (err){
            console.error(err.message);
        }
    }
    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${id}`}>
                Edit
            </button>

            <div className="modal" id={`id${id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Edit Todo</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)}></input>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" data-dismiss="modal" onClick = { e => updateDescription(e)}>Edit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick = { e => setDescription(todo)}>Close</button>
                        </div>

                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default EditTodo;