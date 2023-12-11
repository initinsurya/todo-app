 import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TodoItem from './TodoItem';
import TodoFormPopup from './TodoFormPopup';
import { setFilter } from '../redux/actions';
import './TodoList.css';  

const TodoList = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const todos = useSelector((state) => state.todos);

  const [filteredTodos, setFilteredTodos] = useState(todos);


  console.log(todos)

  useEffect(()=>{
    const filteredTodos = todos.filter((todo) => {
        if (filter === 'all') {
          return true;
        } else if (filter === 'Complete') {
          return todo.status === 'Complete';
        } else {
          return todo.status === 'Incomplete';
        }
      });
      setFilteredTodos(filteredTodos)

  },[filter,todos])

  

  const openPopup = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
  };

  return (
    <div className="todo-app-container">
      <div className="todo-header">
        
        <div>
          <button onClick={openPopup}>Add Todo</button>
        </div>
        <div className="filter-container">
        <label>Filter:</label>
        <select value={filter} onChange={(e) => handleFilterChange(e.target.value)}>
          <option value="all">All</option>
          <option value="Complete">Complete</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>
      </div>

     

      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>

      <TodoFormPopup isOpen={isPopupOpen} onClose={closePopup} />
    </div>
  );
};

export default TodoList;
