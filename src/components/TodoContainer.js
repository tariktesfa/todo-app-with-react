import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Header from './Header';
import TodoList from './TodoList';
import InputTodo from './InputTodo';
import Navbar from './Navbar';

import About from '../page/About';
import NotMatch from '../page/NotMatch';

function getInitialTodos() {
  // Get stored items from localstorage
  const temp = localStorage.getItem('todos');
  const savedTodos = JSON.parse(temp);
  return savedTodos || [];
}

const TodoContainer = () => {
  const [todos, setTodos] = useState(getInitialTodos());

  const handleChange = (id) => {
    setTodos((prevState) => prevState.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    }));
  };

  const deleteTodo = (id) => {
    setTodos([
      ...todos.filter((todo) => todo.id !== id),
    ]);
  };

  const addTodoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const setUpdate = (updatedTitle, id) => {
    setTodos(
      todos.map((todo) => {
        const todoItem = todo;
        if (todo.id === id) {
          todoItem.title = updatedTitle;
        }
        return todo;
      }),
    );
  };

  useEffect(() => {
    const temp = localStorage.getItem('todos');
    const loadedTodos = JSON.parse(temp);

    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem('todos', temp);
  }, [todos]);

  return (
    <>
      <Navbar />
      <Header />
      <Switch>
        <Route exact path="/">
          <div className="container">
            <div className="inner">
              <InputTodo addTodoProps={addTodoItem} />
              <TodoList
                todos={todos}
                handleChangeProps={handleChange}
                deleteTodoProps={deleteTodo}
                setUpdate={setUpdate}
              />
            </div>
          </div>
        </Route>
        <Route path="/about" component={About} />
        <Route path="*" component={NotMatch} />
      </Switch>
    </>
  );
};

export default TodoContainer;
