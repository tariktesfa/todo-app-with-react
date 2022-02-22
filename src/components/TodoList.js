import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItems';

const TodoList = (props) => {
  const {
    todos,
    handleChangeProps,
    deleteTodoProps,
    setUpdate,
  } = props;

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleChangeProps={handleChangeProps}
          deleteTodoProps={deleteTodoProps}
          setUpdate={setUpdate}
        />
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  setUpdate: PropTypes.func.isRequired,
  deleteTodoProps: PropTypes.func.isRequired,
  handleChangeProps: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    completed: PropTypes.bool,
    title: PropTypes.string,
  })).isRequired,
};

export default TodoList;
