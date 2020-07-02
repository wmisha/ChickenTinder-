import React, { useState, useEffect, useContext } from 'react';

import { View, Dimensions, StyleSheet, Button, AsyncStorage } from 'react-native';

import { useNavigation } from '@react-navigation/native';


import TopBar from './TopBar';
import AddTodo from './AddTodo';
import ListTodos from './ListTodos';
import EditTodo from './EditTodo';


import ListNameContext from '../contexts/ListNameContext';
import WhichListContext from '../contexts/WhichListContext';
import AccountContext from '../contexts/AccountContext';

const TodoList = (props) => {
    const [todos, setTodos] = useState([]);
    const [editId, setEditId] = useState(0);
    const [editShowing, setEditShowing] = useState(false);
    const [account, setAccount] = useContext(AccountContext)

    const navigation = useNavigation();
    const [todoListId, setTodoListId] = useContext(WhichListContext);


    const route = `http://localhost:5000/todos/`

    const onSelect = props.onSelect || (async () => { })

    useEffect(() => {
        setAccount(props.account)
    }, [props.account])

    useEffect(() => {
        refreshTodos()
    }, [account])
    
    const getTodos = async () => {

        const response = await fetch(`${route}${todoListId}`, {
            headers: { "Authorization": `Bearer ${account}`}
        });
        const todos = await response.json();

        return todos;
    }

    const refreshTodos = () => {
        getTodos().then(todos => setTodos(todos));
    }

    const [height, setHeight] = useState(Dimensions.get("window").height)

    const changeEditId = (newEditId) => {
        setEditId(newEditId)
        setEditShowing(true);
    }

    const revertVisibility = () => {
        setEditShowing(false);
    }

    const onLayout = (e) =>  {
        setHeight(Dimensions.get('window').height)
    }

    useEffect(() => {
        // So we load a blank list instead of the wrong list
        // if we lose network connection
        setTodos([]);

        // while refreshing todos
        refreshTodos();
    }, [todoListId]);

    return (
        <View style={{height}} onLayout={onLayout}>
            <TopBar todos={todos} />
            <EditTodo id={editId} showing={editShowing} onHide={revertVisibility} onSubmit={refreshTodos} route={route} todoListId={todoListId} account={account}/>
            <ListTodos onChange={refreshTodos} todos={todos} id={todoListId} onEdit={changeEditId} route={route} onSelect={onSelect} account={account}/>
            <AddTodo onSubmit={refreshTodos} route={route} specific={true} account={account} />
        </View>
    )
}
export default TodoList; 