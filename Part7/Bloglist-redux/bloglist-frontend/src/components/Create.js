import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeTitle, changeAuthor, changeUrl } from '../reducers/createDetails'

const Create = ({ createBlog }) => {

    const dispatch = useDispatch()
    const createDetails = useSelector(state => state.createDetails)
    const handleTitleChange = (event) =>
    {
        dispatch(changeTitle(event.target.value))
    }
    const handleAuthorChange = (event) =>
    {
        dispatch(changeAuthor(event.target.value))
    }
    const handleUrlChange = (event) =>
    {
        dispatch(changeUrl(event.target.value))
    }

    const addBlog = (event) =>
    {
        event.preventDefault()
        createBlog(createDetails)
        dispatch(changeTitle(''))
        dispatch(changeAuthor(''))
        dispatch(changeUrl(''))
    }

    return (
        <div>
            <form onSubmit={addBlog} >
                title : <input id='title' onChange={handleTitleChange} ></input> <br/>
                author : <input id='author' onChange={handleAuthorChange} ></input> <br/>
                url : <input id='url' onChange={handleUrlChange} ></input> <br/>
                <button id='createBlog' type='submit'> create </button>
            </form>
        </div>
    )
}

export default Create
