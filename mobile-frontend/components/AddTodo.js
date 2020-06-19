import * as React from 'react';
import { Searchbar } from 'react-native-paper';

export default class AddTodo extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            todoInput: '',
        }

        this.onSubmit = this.props.onSubmit || (() => {});
        this._onChangeTodo = this._onChangeTodo.bind(this);
        this._submitTodo = this._submitTodo.bind(this);
    }


    _onChangeTodo = input => this.setState({ todoInput: input  })

    _submitTodo = () => {
        const {todoInput} = this.state;

        fetch('http://localhost:5000/todos/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({todo: todoInput})
        }).then(() => {
            this.setState({ todoInput: '' })
            this.onSubmit();
        })


    }

    render() {
        const { todoInput } = this.state;

        return (
            <Searchbar
                icon="plus"
                placeholder="Add a todo"
                searchAccessibilityLabel="Form to add a todo item"
                onChangeText={this._onChangeTodo}
                onSubmitEditing={this._submitTodo} // for enter key
                onIconPress={this._submitTodo} // for pressing the icon
                value={this.state.todoInput}
            />
        )
    }

};

