import React, { useState, useEffect, useContext } from 'react';
import { Button, Dialog, Portal, Searchbar } from 'react-native-paper';

import WhichListContext from './WhichListContext';
import EditTextContext from './EditTextContext';

const EditTodo = (props) => {

    const onHide = props.onHide || (() => { })
    const onSubmit = props.onSubmit || (() => { });
    const route = props.route || 'http://localhost:5000/todos/';

    let [visible, setVisible] = useState(props.showing || false)

    const [editText, setEditText] = useContext(EditTextContext);
    const [todoListId, setTodoListId] = useContext(WhichListContext);
    const [isList, setIsList] = useState(props.isList || false);
    const [id, setId] = useState(props.id)


    const [todoInput, setTodoInput] = useState(editText);

    useEffect(() => {
        setTodoInput(editText)
    }, [editText])
    
    const fullRoute = isList ? `${route}${id}` : `${route}${todoListId}/${id}` ;

    useEffect(() => {
        const fullRoute = todoListId ? `${route}${todoListId}/${id}` : `${route}${id}`;
    }, [todoListId, id, route]);

    useEffect(() => {
        setId(props.id)
    }, [props.id])

     useEffect(() => {
        setVisible(props.showing)
    }, [props.showing]);

    const hideDialogue = () => {
        onHide();
        setVisible(false);
        setTodoInput(editText);
    }

    const onChangeTodo = input => setTodoInput(input)

    const submitTodo = () => {
        fetch(fullRoute, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ todo: todoInput, name: todoInput })
        }).then(() => {
            onSubmit();
        }).catch(err => console.log(err))
    }

    return (
        <Portal>
            <Dialog
                visible={visible}
                onDismiss={hideDialogue}>
                <Dialog.Title>Update { isList ? "List" : "Todo" } #{id} </Dialog.Title>
                <Searchbar
                    icon='circle-edit-outline'
                    placeholder={isList ? "Edit List" : "Edit Todo"} 
                    searchAccessibilityLabel="Form to add a todo item"
                    onChangeText={onChangeTodo}
                    onSubmitEditing={submitTodo} // for enter key
                    onIconPress={submitTodo} // for pressing the icon
                    value={todoInput}
                />
                <Dialog.Actions>
                    <Button onPress={() => {submitTodo(); hideDialogue() }}>Submit</Button>
                    <Button color="red" onPress={hideDialogue}>Cancel</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

export default EditTodo;
