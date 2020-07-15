import React,{useReducer} from 'react'

const reducer = (state,action) => {
    switch (action.type) {
        case 'SET':
            return action.data
        default:
           return state
    }
}

function Comment({add , blog}) {
    
    const [comment,dispatch] = useReducer(reducer,'')

    const handleInput =(event) =>
    {
        dispatch({type : 'SET' , data : event.target.value})
    }
    return (
        <div>
            <input onChange={handleInput}/>
            <button onClick={() =>{ 
                add(blog,comment)
                dispatch({type : 'SET' , data : '' })}}>add comment</button>
        </div>
    )
}

export default Comment
