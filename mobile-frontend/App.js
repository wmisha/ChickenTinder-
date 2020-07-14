import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import CreateGroup from './components/CreateGroup';
import JoinGroup from './components/JoinGroup';
import ViewResults from './components/ViewResults';
import SwipeRestaurants from './components/SwipeRestaurants';

import reducer from './reducers'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const Drawer = createDrawerNavigator();
const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));

const App = () => {
   return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator edgeWidth={0}>
          <Drawer.Screen name="Login" component={LoginForm} />
          <Drawer.Screen name="Register" component={RegistrationForm} />
          <Drawer.Screen name="Create"component={CreateGroup} />
          <Drawer.Screen name="Join" component={JoinGroup} />
          <Drawer.Screen name="Results ▽" component={ViewResults} />
          <Drawer.Screen name="Swipe ▽" component={SwipeRestaurants} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
    )
}

export default App;