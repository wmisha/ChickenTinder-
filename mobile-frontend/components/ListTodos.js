import  React, {useState, useEffect, useContext } from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import WhichListContext from './WhichListContext'
import ListNameContext from './ListNameContext';



const ListTodos = (props) => {

    const [todos, setTodos] = useState(props.todos.sort && props.todos.sort((a, b) => a.id - b.id));
    const [todoListId, setTodoListId] = useContext(WhichListContext)

    const [todoListName, setTodoListName] = useContext(ListNameContext);
    const onChange = props.onChange || (() => { })
    const onEdit = props.onEdit || (() => { })


    const route = props.route || `http://localhost:5000/todos/`

    const navigation = useNavigation();

    const onSelect = props.onSelect ? (id) => { props.onSelect(id).then(() => navigation.navigate('Primary'))} : (() => { })

    const deleteTodo = (id) => {
        const location = props.outer === "yes" ? `${route}${id}` : `${route}${todoListId}/${id}`
        fetch(location, {
            method: 'DELETE'
        }).then(() => {
            onChange();
        })

    }

    useEffect(() => {
        if (props.todos && props.todos.sort !== undefined){
            setTodos(props.todos.sort((a, b) => a.id - b.id))
        }

        if (props.todoListId){
            setTodoListId(props.todoListId)
        }
    })
    
    const todoRender = todos.map((todo) => {
        return (
            <List.Item
                onPress={() => { 
                    onSelect(todo.id) 

                    if (todo.name){
                        setTodoListName(todo.name)
                    }
                }}
                style={{ margin: -10, textAlign: 'center' }}
                key={todo.id}
                title={todo.todo || todo.name}
                left={() => {
                    return (
                        <TouchableOpacity onPress={() => { onEdit(todo.id) }}>
                            <List.Icon color="#1D3557" icon="pencil" />
                        </TouchableOpacity>)
                }}
                right={() => {
                    return (
                        <TouchableOpacity onPress={() => { deleteTodo(todo.id) }}>
                            <List.Icon color="#E63946" icon="delete" onPress={() => deleteTodo(todo.id)} />
                        </TouchableOpacity>);
                }}
            />);
    });
    return (
        <ScrollView style={styles.height}>
            <List.Section style={{ marginTop: 20 }}>
                {todoRender}
            </List.Section>
        </ScrollView>)

}

export default ListTodos;

let height = Dimensions.get("window").height;

const styles = StyleSheet.create({
    height: {
        maxHeight:  0.68 * height
    }

}) 


