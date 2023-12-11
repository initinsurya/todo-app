 import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/actions';
import './TodoForm.css';  

const TodoForm = () => {
    const [text, setText] = useState('');
    const [isFieldEmpty, setFieldEmpty] = useState(false); 
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() !== '') {
            dispatch(addTodo(text));
            setText('');
            setFieldEmpty(false);
        } else {
            setFieldEmpty(true);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Todo Item:
                <input
                    type="text"
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                        setFieldEmpty(false); 
                    }}
                    
                    className={isFieldEmpty ? 'required' : ''}  
                />
            </label>
         </form>
    );
};

export default TodoForm;
