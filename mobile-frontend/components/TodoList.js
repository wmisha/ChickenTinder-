import React, { useState, useEffect, useContext } from 'react';

import { View, Dimensions, StyleSheet, Button } from 'react-native';

import { useNavigation } from '@react-navigation/native';


import TopBar from './TopBar.js';
import AddTodo from './AddTodo.js';
import ListTodos from './ListTodos.js';
import EditTodo from './EditTodo.js';


import ListNameContext from './ListNameContext';
import WhichListContext from './WhichListContext';

const TodoList = (props) => {
    const [todos, setTodos] = useState([]);
    const [editId, setEditId] = useState(0);
    const [editShowing, setEditShowing] = useState(false);

    const navigation = useNavigation();
    const [todoListId, setTodoListId] = useContext(WhichListContext);

    const route = `http://localhost:5000/todos/`

    const onSelect = props.onSelect || (async () => { })

    const getTodos = async () => {
        const response = await fetch(`${route}${todoListId}`);
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

    useEffect(() => {
        // So we load a blank list instead of the wrong list
        // if we lose network connection
        setTodos([]);

        // while refreshing todos
        refreshTodos();
    }, [todoListId]);

    return (
        <View style={styles.long}>
            <TopBar todos={todos} />
            <EditTodo id={editId} showing={editShowing} onHide={revertVisibility} onSubmit={refreshTodos} route={route} todoListId={todoListId} />
            <ListTodos onChange={refreshTodos} todos={todos} id={todoListId} onEdit={changeEditId} route={route} onSelect={onSelect} />
            <AddTodo onSubmit={refreshTodos} route={route} specific={true} />
        </View>
    )
}
export default TodoList; 

let ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    long: {
        height: ScreenHeight
    }
})