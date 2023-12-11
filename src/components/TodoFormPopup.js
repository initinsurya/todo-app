 import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/actions';
import { motion, AnimatePresence } from 'framer-motion';
import './TodoList.css';  

const TodoFormPopup = ({ isOpen, onClose }) => {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('Incomplete');
  const [isFieldEmpty, setFieldEmpty] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      dispatch(addTodo({ text, status }));
      setText('');
      setStatus('Incomplete');  
      setFieldEmpty(false);
      onClose();
    } else {
      setFieldEmpty(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="popup-container"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
          >
            <h2>Add Todo</h2>
            <form onSubmit={handleSubmit}>
              <label>Title:</label>
              <input
                type="text"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setFieldEmpty(false);
                }}
                className={isFieldEmpty ? 'required' : ''}
              />

              <label>Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Incomplete">Incomplete</option>
                <option value="Complete">Complete</option>
              </select>

              <div className="button-container">
                <button type="submit" onClick={handleSubmit}>Add</button>
                <button type="button" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TodoFormPopup;
