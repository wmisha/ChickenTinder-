import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ListOfLists from './components/ListOfLists'
import TodoList from './components/TodoList';
import BlankComponent from './components/BlankComponent';

import WhichListContext from './components/WhichListContext'
import ListNameContext from './components/ListNameContext';

const Drawer = createDrawerNavigator();

const App = () => {
  const [todoListId, setTodoListId] = useState(8);
  const [todoListName, setTodoListName] = useState('hmm');

  const onSelect = async (id) => {

    //alert(`inside onselect, switching to ${id}`)
    if (id) {
      await setTodoListId(id);
    }
  }

   return (
     <ListNameContext.Provider value={[todoListName, setTodoListName]}>
      <WhichListContext.Provider value={[todoListId, setTodoListId]}>
        <NavigationContainer>
          <Drawer.Navigator edgeWidth={0}>
            <Drawer.Screen name="Secondary">
              {props => <ListOfLists {...props} route='http://localhost:5000/todos/' onSelect={onSelect} id={todoListId} initialParams={{ id: todoListId }} />}
            </Drawer.Screen>
            <Drawer.Screen name="Primary">
              {props => <TodoList {...props} id={todoListId} />}
            </Drawer.Screen>

          </Drawer.Navigator>
        </NavigationContainer>
        </WhichListContext.Provider>
       </ListNameContext.Provider>
    )
} 

export default App;