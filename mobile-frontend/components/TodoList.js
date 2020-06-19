import React from 'react';

import { View, Dimensions, StyleSheet } from 'react-native';

import TopBar from './TopBar.js';
import AddTodo from './AddTodo.js';
import ListTodos from './ListTodos.js';
import EditTodo from './EditTodo.js';


export default class TodoList extends React.Component {
    constructor(props){
        super(props);

        this.state = { todos: [], editId: 0, editShowing: false }

        this.refreshTodos = this.refreshTodos.bind(this);
        this.revertVisibility = this.revertVisibility.bind(this);

        this.changeEditId = this.changeEditId.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async getTodos() {
        const response = await fetch('http://localhost:5000/todos')
        const todos = await response.json();

        console.log("TODOS TYPE", typeof todos);
        console.log("TODOS", todos);
        return todos;
    }

    refreshTodos = () => {
        this.getTodos().then(todos => {this.setState({todos: todos})})
    }

    changeEditId = (editId) => {
        console.log("BUtton went throughQ");
        this.setState({editId})
        this.setState({editShowing: true})
        console.log(this.state)
    }

    revertVisibility = () => {
        this.setState({ editShowing: false })
    }

    //componentWillMount(){
    //    this.refreshTodos();
    //}

    componentDidMount(){
        this.refreshTodos();
    }

    render(){
        return (
            <View style={styles.long}>
                <TopBar navigation="cheese" />
                <EditTodo id={this.state.editId} showing={this.state.editShowing} onHide={this.revertVisibility} onSubmit={this.refreshTodos}/>
                <ListTodos onChange={this.refreshTodos} todos={this.state.todos} onEdit={this.changeEditId}/>
                <AddTodo onSubmit={this.refreshTodos} />

            </View>
        )
    }
}


let ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    long: {
        height: ScreenHeight
    }
})