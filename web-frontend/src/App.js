import React from 'react';
import logo from './logo.svg';
import InputTodo from './components/InputTodo.js';
import ListTodos from './components/ListTodos.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="LimitedWidthCenter">
        <InputTodo />
        <ListTodos />
      </div>
    </div>
  );
}

export default App;
