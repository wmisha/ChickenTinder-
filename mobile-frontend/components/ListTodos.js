import * as React from 'react';
import { TouchableOpacity } from 'react-native'
import { List } from 'react-native-paper';

export default class ListTodos extends React.Component {

    constructor(props){
        super(props);

        this.onChange = this.props.onChange || (() => {})
        this.onEdit = this.props.onEdit || (() => {})
        
        this.state = {
            todos: this.props.todos.sort((a, b) => a.id - b.id)
        }

    }

    deleteTodo(id){
        fetch(`http://localhost:5000/todos/${id}`, {
            method: 'DELETE'
        }).then(() => {
            this.onChange();
        })

    }

    // deprecated
    //componentWillReceiveProps(nextProps){
    //    this.setState({todos: nextProps.todos});
   // }

   // replacement
   static getDerivedStateFromProps(nextProps, previousState){
       if (nextProps.todos !== previousState.todos)
          return {todos: nextProps.todos.sort((a, b) => b.id - a.id)};
       else
          return null;
   }

    render () {
        const todos = this.state.todos.map((todo) => {
            return (
            <List.Item
                style = {{margin: -10, textAlign: 'center'}}
                key = {todo.id}
                title={todo.todo}
                left={() => {
                    return (
                        <TouchableOpacity onPress={() => { this.onEdit(todo.id) }}>
                            <List.Icon color="#1D3557" icon="pencil" />
                    </TouchableOpacity>)
                }}
                right={() => {
                    return(
                        <TouchableOpacity onPress={() => { this.deleteTodo(todo.id)}}>
                            <List.Icon color="#E63946" icon="delete" onPress={() => this.deleteTodo(todo.id)}  />
                        </TouchableOpacity>);
                }}
                />);});
        console.log(this)
        console.log("Now todos: ", todos)

        return (
            <List.Section>
                { todos }
            </List.Section>
        )
    }
}