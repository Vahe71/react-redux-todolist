import React from 'react'
import { useDispatch } from 'react-redux'
import { removeTodo } from '../../../store/todoSlice';
import './CloseButton.css'
import trashIcon from '../../../images/trash.png'

function CloseButton({ todo }) {
    const dispatch = useDispatch();

    return (
        <img
            className='close'
            onClick={() => {
                dispatch(removeTodo({ id: todo.id }))
            }}
            src={trashIcon} />
    )
}

export default CloseButton