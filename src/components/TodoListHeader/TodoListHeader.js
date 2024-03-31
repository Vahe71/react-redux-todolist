import React, { useRef } from 'react'
import { useState } from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../store/todoSlice';
import './TodoListHeader.css'
import OutsideClickHandler from 'react-outside-click-handler';

function TodoListHeader() {
    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const [inputFocus, setInputFocus] = useState(false);
    const inputRef = useRef(null);

    const handleClick = useCallback((e) => {
        e.preventDefault();
        setInputFocus(true);
        inputRef.current.focus();
        const newTodo = value.trim().length > 0 ? value : false;
        if (newTodo) {
            dispatch(addTodo({
                text: newTodo
            }));
            setValue('');
        }
    })

    return (
        <OutsideClickHandler
            onOutsideClick={() => {
                setInputFocus(false)
            }}
        >
            <div className={'todo-header' + (inputFocus ? ' input-focused ' : '')}>
                <form>
                    <input
                        ref={inputRef}
                        placeholder='Add new task'
                        value={value}
                        type='text'
                        onChange={(e) => setValue(e.target.value)}
                        onFocus={() => setInputFocus(true)}
                    />
                    <button onClick={handleClick}>+</button>
                </form>
            </div>
        </OutsideClickHandler>
    )
}

export default TodoListHeader