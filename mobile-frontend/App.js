import * as React from 'react';

import TodoList from './components/TodoList';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SideMenu from 'react-native-side-menu';



const Drawer  = createDrawerNavigator();

export default class App extends React.Component {

  state = {
    todoListId: 0
  }

  render() {
    return <TodoList />
  }
}

