import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeProgress, editMessage, getCompletedSize, getRemovedTodos, getTodos, setCompletedSize, setShowDeletedTodos, showTodosPanel, toggleTodoComplete } from '../../store/todoSlice';
import { useEffect } from 'react';
import CloseButton from './CloseButton/CloseButton';
import Checkbox from './Checkbox/Checkbox';
import './TodoList.css'
import EditMsg from './EditMsg/EditMsg';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip'
import ReturnIcon from './ReturnIcon/ReturnIcon';

function ListSturcture({ todo, index, type }) {
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const date = new Date();
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() :  date.getSeconds();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const writeDate = `${month} ${day}th - ${hours}:${minutes}:${seconds}`;


    useEffect(() => {
        showInput && inputRef.current.focus();
    }, [showInput]);
    useEffect(() => {
        setInputValue(todo.title)
    }, []);

    return (
        <li key={index}>
            <Checkbox todo={todo} />
            <Tooltip id="my-tooltip" />
            {
                showInput ?
                    <input
                        ref={inputRef}
                        value={inputValue}
                        className='edit-input'
                        onChange={(e) => {
                            setInputValue(e.target.value);
                        }}
                        onBlur={() => {
                            inputValue && dispatch(editMessage({
                                id: todo.id,
                                newTitle: inputValue
                            }))
                        }}
                        type='text'
                    /> :
                    <span className='desc' data-tooltip-id="my-tooltip" data-tooltip-content={writeDate}>{todo.title}</span>
            }
            <div className='tools'>
                {type === 'todos' &&
                    <>
                        {
                            <EditMsg
                                showInput={showInput}
                                setShowInput={setShowInput}
                                todo={todo}
                            />
                        }
                        {
                            !showInput && <CloseButton todo={todo} />
                        }
                    </>
                }
                { 
                   type === 'removedTodos' && <ReturnIcon todo={todo} />
                }
            </div>
        </li>
    )
}

function TodoList() {
    const dispatch = useDispatch();
    const todos = useSelector(getTodos);
    const removedTodos = useSelector(getRemovedTodos);
    const showRemovedTodos = useSelector(showTodosPanel);

    useEffect(() => {
        dispatch(setCompletedSize());
        dispatch(changeProgress());
    }, [todos]);


    return (
        <div>
            <h1 className='title'>{showRemovedTodos ? 'Deleted todos' : 'Todos'}</h1>
            <ul className='list'>
                {
                    showRemovedTodos ?
                        removedTodos.map((todo, index) => {
                            return (
                                <ListSturcture type='removedTodos' key={index} todo={todo} index={index} />
                            )
                        })
                        :
                        todos.map((todo, index) => {
                            return (
                                <ListSturcture type='todos' key={index} todo={todo} index={index} />
                            )
                        })
                }
            </ul>
        </div>
    )
}

export default TodoList

















