import React from 'react'
import './ProgressBar.css'
import { useSelector } from 'react-redux'
import { getProgress } from '../../store/todoSlice'
import { useState } from 'react';
import { useEffect } from 'react';

function ProgressBar() {

    const progress = useSelector(getProgress);
    const [color, setColor] = useState('transparent');

    useEffect(() => {
        const newColor = `rgb(${(100 - progress) * 255 / 100}, ${(progress / 100) * 255}, 0)`;
        setColor(newColor);
    }, [progress])

    return (
        <div className='progress-bar'>
            <div className='track' style={{border: `2px solid ${color}`}}>
                <div className='progress'
                    style={{
                        width: `${progress}%`,
                        backgroundColor: color
                    }}>
                </div>
                <div className={'progress-size' + (progress >= 50 && progress <= 80 ? ' light ' : '')}>
                    {progress ? progress : 0} %
                </div>
            </div>
        </div>
    )
}

export default ProgressBar