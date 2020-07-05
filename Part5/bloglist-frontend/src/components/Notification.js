import React from 'react'
import './index.css'

function Notification({ message,errorMessage }) {
    if(message !== null && errorMessage!== null)
    {
        return(
            <div>
                <div className='message'>
                    {message}
                </div>
                <div className='error'>
                    {errorMessage}
                </div>
            </div>
        )
    }
    else if(message !== null){
        return (
            <div className='message'>
                {message}
            </div>
        )
    }
    else if(errorMessage !== null)
    {
        return(
            <div className='error'>
                {errorMessage}
            </div>
        )
    }
    
    else return null
}

export default Notification