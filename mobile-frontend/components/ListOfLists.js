import React, {useState, useEffect } from 'react';

import { View, Dimensions, StyleSheet, Text } from 'react-native';

import OuterTopBar from './OuterTopBar.js';
import AddTodo from './AddTodo.js';
import ListTodos from './ListTodos.js';
import EditTodo from './EditTodo.js';


const ListOfLists = (props) => {
    const [todos, setTodos] = useState([]);
    const [editId, setEditId] = useState(0);
    const [editShowing, setEditShowing] = useState(false);
    const [todoListId, setTodoListId] = useState(props.id);
    const [height, setHeight] = useState(Dimensions.get("window").height)

    const route = `http://localhost:5000/todos/`

    const onSelect = props.onSelect || (async () => { })

    const getTodos = async () => {
        const response = await fetch(route);
        const todos = await response.json();

        return todos;
    }

    const refreshTodos = () => {
        getTodos().then(todos => setTodos(todos));
    }


    const changeEditId = (newEditId) => {
        setEditId(newEditId)
        setEditShowing(true);
    }

    const revertVisibility = () => {
        setEditShowing(false);
    }

    const onLayout = (e) => {
        setHeight(Dimensions.get('window').height)
    }

    useEffect(() => {
        refreshTodos()
    }, []);

    return (
        <View style={{height}} onLayout={onLayout}>
            <OuterTopBar navigation="cheese" />
            <EditTodo showing={editShowing} onHide={revertVisibility} onSubmit={refreshTodos} route={route} id={editId} isList={true}/>
            <ListTodos outer="yes" onChange={refreshTodos} todos={todos} id={todoListId} onEdit={changeEditId} route={route} onSelect={onSelect} />
            <AddTodo outer="yes" onSubmit={refreshTodos} route={route} />
            <Text>{props.params}</Text>
        </View>
    )
}

export default ListOfLists;