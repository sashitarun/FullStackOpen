import React from 'react'
import './index.css'

function Notification({message}) {
    if(message !== null)
    return (
        <div className='message'>
            {message}
        </div>
    )
    else return null
}

export default Notification
