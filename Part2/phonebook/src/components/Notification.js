import React from 'react'
import './index.css'


function Notification({message,deleteMessage}) {

    if(message !== null)
    return (
        <div className='message'>
            {message}
        </div>
    )
    if(deleteMessage !== null)
    {
        return(
            <div className='error'>
                {deleteMessage}
            </div>
        )
    }
    else return null
}

export default Notification
