import React, { useState, useEffect, useContext } from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet, Dimensions } from 'react-native';

import WhichListContext from './WhichListContext';

const AddTodo = (props) => {
    const [todoInput, setTodoInput] = useState('');
    const [todoListId, setTodoListId] = useContext(WhichListContext);

    let route = props.route || 'http://localhost:5000/todos/';

    if (props.specific === true){
        route = `${route}${todoListId}`;
    }

    const onSubmit = props.onSubmit || (() => { });

    const _submitTodo = () => {

        fetch(route, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ todo: todoInput, name: todoInput })
        }).then(() => {
            setTodoInput('')
            onSubmit();
        })
    }

    return (
        <Searchbar
            style={styles.searchBar}
            icon="plus"
            placeholder={ props.outer ? "Add a List" : "Add a Todo" }
            searchAccessibilityLabel="Form to add a todo item"
            onChangeText={setTodoInput}
            onSubmitEditing={_submitTodo} // for enter key
            onIconPress={_submitTodo} // for pressing the icon
            value={todoInput}
        />
    )

}

export default AddTodo;

const styles = StyleSheet.create({
    searchBar: {
        position: 'absolute',
        bottom: 140,
        left: 30,
        right: 30,
    },
});

