import React from 'react'
import returnIcon from '../../../images/return.png';
import './ReturnIcon.css'
import { useDispatch } from 'react-redux';
import { returnDeletedTodo } from '../../../store/todoSlice';

function ReturnIcon({ todo }) {

    const dispatch = useDispatch();

    return (
        <img
            onClick={() => { dispatch(returnDeletedTodo(todo)); console.log(todo) }}
            src={returnIcon}
            className='return-icon' />
    )
}

export default ReturnIcon