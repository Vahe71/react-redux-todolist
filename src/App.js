import React, { createContext, useContext, useEffect, useState, useReducer, useCallback } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { addTodo, deleteCompleted, fetchTodos, setCompletedSize, removeTodo, toggleTodoComplete, getCompletedSize, getUnCompletedSize } from './store/todoSlice';
import TodoList from './components/TodoList/TodoList';
import CompletedTodo from './components/CompletedTodo/CompletedTodo';
import TodoListHeader from './components/TodoListHeader/TodoListHeader';
import ProgressBar from './components/ProgressBar/ProgressBar';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <div className='app'>
      <div className='todo-list'>
        <TodoListHeader />
        <TodoList />
        <CompletedTodo />
        <ProgressBar />
      </div>
      <div className='copyright'>
        © Vahe Hayrapetyan
      </div>
    </div>
  );
}

export default App;
