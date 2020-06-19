import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


import TodoList from './components/TodoList';
import BlankComponent from './components/BlankComponent';


const Drawer = createDrawerNavigator();


export default class App extends React.Component {

  state = {
    todoListId: 0
  }

  render() {
    return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Primary">
          { props => <TodoList {...props} id={this.todoListId}> </TodoList>}
        </Drawer.Screen>
        <Drawer.Screen name="Secondary" component={BlankComponent} />
      </Drawer.Navigator>
    </NavigationContainer>)
  }
}

