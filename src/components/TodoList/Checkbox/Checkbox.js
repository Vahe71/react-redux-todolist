import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodoComplete } from '../../../store/todoSlice';
import './Checkbox.css';

function Checkbox({ todo }) {
    const dispatch = useDispatch();

    return (
        <>
            <input
                className='checkbox'
                id={`checkbox-${todo.id}`}
                type='checkbox'
                checked={todo.completed}
                onChange={(e) => {
                    dispatch(toggleTodoComplete({ id: todo.id, completed: e.target.checked }));
                }}
            />
            <label className='label-for-checkbox' htmlFor={`checkbox-${todo.id}`}></label>
        </>
    );
}

export default Checkbox;
