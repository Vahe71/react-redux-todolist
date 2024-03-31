import React from 'react'
import { deleteCompleted, getCompletedSize, getRemovedTodos, getUnCompletedSize, setShowDeletedTodos, showTodosPanel } from '../../store/todoSlice'
import { useDispatch, useSelector } from 'react-redux'
import './CompletedTodo.css'

function CompletedTodo() {
    const dispatch = useDispatch();
    const completedSize = useSelector(getCompletedSize)
    const unCompletedSize = useSelector(getUnCompletedSize);
    const deletedPanelOpened = useSelector(showTodosPanel);
    const removedTodos = useSelector(getRemovedTodos);

    return (
        <div className='completed-todo'>
            <div className='completed-info'>
                <span>
                    Completed: {completedSize}
                </span>
                <span>
                    Uncompleted: {unCompletedSize}
                </span>
                <span>
                    Deleted: {removedTodos.length}
                </span>
            </div>
            <div className='completed-buttons'>
                <div
                    className='delete-completed'
                    onClick={() => {
                        dispatch(deleteCompleted())
                    }}
                >
                    DELETE COMPLETED
                </div>
                <div
                    className='deleted-todos'
                    onClick={() => {
                        dispatch(setShowDeletedTodos(!deletedPanelOpened));
                    }}
                >
                    {deletedPanelOpened ? 'See todos' : 'See deleted todos'}
                </div>
            </div>
        </div>
    )
}

export default CompletedTodo