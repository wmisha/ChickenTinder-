import  React, {useState, useEffect, useContext } from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import WhichListContext from '../contexts/WhichListContext'
import ListNameContext from '../contexts/ListNameContext';

import EditTextContext from '../contexts/EditTextContext';

const ListTodos = (props) => {

    const [todos, setTodos] = useState(props.todos.sort && props.todos.sort((a, b) => a.id - b.id));
    const [editText, setEditText] = useContext(EditTextContext);
    const [todoListName, setTodoListName] = useContext(ListNameContext);
    const onChange = props.onChange || (() => { })
    const onEdit = props.onEdit || (() => { })
    const route = props.route || `http://localhost:5000/todos/`
    const navigation = useNavigation();
    let scrollView;

    const onSelect = props.onSelect ? (id) => { props.onSelect(id).then(() => navigation.navigate('Primary'))} : (() => { })

    const deleteTodo = (itemId) => {
        const location = props.outer === "yes" ? `${route}${id}` : `${route}${props.id}/${itemId}`
        fetch(location, {
            method: 'DELETE',
            headers: { "Authorization": `Bearer ${props.account}` }
        }).then(() => {
            onChange();
        })

    }

    useEffect(() => {
        if (props.todos.sort !== undefined){
            setTodos(props.todos.sort((a, b) => a.id - b.id))
        }
    }, [props.todos])
    
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
                        <TouchableOpacity onPress={() => { setEditText(todo.name || todo.todo); onEdit(todo.id) }}>
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
        <ScrollView
            ref={ ref => { scrollView = ref }}
            onContentSizeChange={() => scrollView.scrollToEnd({ animated: true })}
            style={styles.height}>

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


