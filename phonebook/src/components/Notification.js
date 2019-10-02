import React from 'react'

const Notification = ({ message, msgClass }) => {
    if(message === null){
        return null
    }
    return(
        <div className={msgClass} >
            {message}
        </div>
    )
}

export default Notification