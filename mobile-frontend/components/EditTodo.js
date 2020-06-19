import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Searchbar } from 'react-native-paper';

export default class EditTodo extends React.Component {

    constructor(props){
        super(props);

        this.onComplete = this.props.onComplete || (() => {})
        this.onHide = this.props.onHide || (() => {})
        this.onSubmit = this.props.onSubmit || (() => {});
        this.id = this.props.id || 0;

        this.state = {
            visible: this.props.showing || false,
        };
    }

    
    /**
     * This method is the new replacement for older lifecycle methods,
     * including componentDidMount, componentWillMount, and componentWillReceiveProps.
     * 
     * You can read about it here
     * 
     * https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
     * 
     * @param props the props coming in
     * @param state the previous state
     * 
     * @return an object containing changed state elements,
     *         or null if no elements have changed
     */
    static getDerivedStateFromProps(props, state){
        const returnObject = {};

        if (props.showing !== null && props.showing !== state.visible){
            returnObject.visible = props.showing;
        }

        if (props.id !== null && props.id !== state.id){
            returnObject.id = props.id;
        }

        if (Object.keys(returnObject).length > 0){
            return returnObject;
        } else {
            return null;
        }

    }
    /**
     * Deprecated I guess. I mean, I can get why. but.... So much easier
     */
    //componentWillReceiveProps(nextProps){
    //    this.state.visible = nextProps.showing
    //    this.state.id = nextProps.id
    //}

    _hideDialog = () => {
        this.onHide();
        this.setState({ visible: false });
        this.setState({ todoInput: '' })
    }


    _onChangeTodo = input => this.setState({ todoInput: input })

    _submitTodo = () => {
        const { todoInput } = this.state;

        fetch(`http://localhost:5000/todos/${this.state.id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ todo: todoInput })
        }).then(() => {
            this.setState({ todoInput: '' })
            this.onSubmit();

        }).catch(err => console.log(err))

    }

    render() {

        const { todoInput } = this.state;

        return (
  
                <Portal>
                    <Dialog
                        visible={this.state.visible}
                        onDismiss={this._hideDialog}>
                        <Dialog.Title>Update Todo #{this.state.id} </Dialog.Title>
                            <Searchbar
                                icon="plus"
                                placeholder="Edit todo"
                                searchAccessibilityLabel="Form to add a todo item"
                                onChangeText={this._onChangeTodo}
                                onSubmitEditing={this._submitTodo} // for enter key
                                onIconPress={this._submitTodo} // for pressing the icon
                                value={this.state.todoInput}
                            />
                        <Dialog.Actions>
                            <Button onPress={this._hideDialog}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
        );
    }
}