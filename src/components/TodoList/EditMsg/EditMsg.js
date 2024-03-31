import React from 'react'
import editIcon from '../../../images/editmsg.png'
import './EditMsg.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react';


function EditMsg({ todo, showInput, setShowInput }) {
    const dispatch = useDispatch();

    return (
        <img
            onClick={() => {
                setShowInput(!showInput);
            }}
            className='edit-msg-icon'
            src={editIcon} />
    )
}

export default EditMsg