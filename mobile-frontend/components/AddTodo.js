import React, { useState, useEffect, useContext } from 'react';
import { Searchbar } from 'react-native-paper';
import { View, KeyboardAvoidingView, StyleSheet, Dimensions } from 'react-native';

import WhichListContext from '../contexts/WhichListContext';

const AddTodo = (props) => {
    const [todoInput, setTodoInput] = useState('');
    const [todoListId, setTodoListId] = useContext(WhichListContext);

    let route = props.route || 'http://localhost:5000/todos/';

    if (props.specific === true){
        route = `${route}${todoListId}`;
    }

    const onSubmit = props.onSubmit || (() => { });

    const submitTodo = () => {

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
        <KeyboardAvoidingView style={styles.searchBar} behavior='position' >
            <View style={styles.wrapper}>
                <Searchbar
                    icon="plus"
                    returnKeyType="done"
                    placeholder={ props.outer ? "Add a List" : "Add a Todo" }
                    searchAccessibilityLabel="Form to add a todo item"
                    onChangeText={setTodoInput}
                    onSubmitEditing={submitTodo} // for enter key
                    onIconPress={submitTodo} // for pressing the icon
                    value={todoInput}
                />
            </View>
        </KeyboardAvoidingView>
    )

}

export default AddTodo;

const styles = StyleSheet.create({
    wrapper: {
        padding: 24
    },
    
    searchBar: {
        position: 'absolute',
        bottom: 100,
        left: 10,
        right: 10,
    },
});

