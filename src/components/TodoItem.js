 import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';  
import { toggleTodo, deleteTodo, editTodo } from '../redux/actions';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const saveEdit = () => {
    dispatch(editTodo(todo.id, editedText));
    setEditing(false);
  };

  const cancelEdit = () => {
    setEditing(false);
    setEditedText(todo.text);
  };

  return (
    <li className={`todo-item ${todo.status === 'Complete' ? 'complete' : 'incomplete'}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button className="icon-button" onClick={saveEdit}>
            <FaSave />
          </button>
          <button className="icon-button" onClick={cancelEdit}>
            <FaTimes />
          </button>
        </>
      ) : (
        <>
          <span onClick={handleToggle}>{todo.text}</span>
          <button className="icon-button" onClick={handleEdit}>
            <FaEdit />
          </button>
          <button className="icon-button" onClick={handleDelete}>
            <FaTrash />
          </button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
