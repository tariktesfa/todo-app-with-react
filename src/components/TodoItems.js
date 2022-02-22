import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import styles from './TodoItems.module.css';

const TodoItem = (props) => {
  const {
    todo,
    setUpdate,
    deleteTodoProps,
    handleChangeProps,
  } = props;
  const {
    completed,
    id,
    title,
  } = todo;

  const [editing, setEditing] = useState(false);

  const handleEditing = () => {
    setEditing(true);
  };

  const handleUpdatedDone = (event) => {
    if (event.key === 'Enter') {
      setEditing(false);
    }
  };

  const completedStyle = {
    fontStyle: 'italic',
    color: '#595959',
    opacity: 0.5,
    textDecoration: 'line-through',
  };

  const viewMode = {};
  const editMode = {};

  if (editing) viewMode.display = 'none';
  else editMode.display = 'none';

  return (
    <li className={styles.item}>
      <div onDoubleClick={handleEditing} style={viewMode}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={completed}
          onChange={() => handleChangeProps(id)}
        />
        <button type="button" onClick={() => deleteTodoProps(id)}>
          <FaTrash style={{ color: 'orangered', fontSize: '16px' }} />
        </button>
        <span style={completed ? completedStyle : null}>
          {title}
        </span>
      </div>
      <input
        type="text"
        style={editMode}
        value={title}
        className={styles.textInput}
        onChange={(e) => {
          setUpdate(e.target.value, id);
        }}
        onKeyDown={handleUpdatedDone}
      />
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  setUpdate: PropTypes.func.isRequired,
  handleChangeProps: PropTypes.func.isRequired,
  deleteTodoProps: PropTypes.func.isRequired,
};

export default TodoItem;
