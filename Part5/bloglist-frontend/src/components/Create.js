import React from 'react'

const Create = (props) => {
    return (
        <form onSubmit={props.createBlog} >
            title : <input onChange={props.handleTitleChange}></input> <br/>
            author : <input onChange={props.handleAuthorChange}></input> <br/>
            url : <input onChange={props.handleUrlChange}></input> <br/>
            <button type='submit'> create </button>
        </form>
    )
}

export default Create
