import React,{ useState } from 'react'

const Create = ({ createBlog }) => {

    const [title,setTitle] = useState('')
    const [author,setAuthor] = useState('')
    const [url,setUrl]= useState('')

    const handleTitleChange = (event) =>
    {
        setTitle(event.target.value)
    }
    const handleAuthorChange = (event) =>
    {
        setAuthor(event.target.value)
    }
    const handleUrlChange = (event) =>
    {
        setUrl(event.target.value)
    }

    const addBlog = (event) =>
    {
        event.preventDefault()
        createBlog({
            title : title,
            author : author,
            url : url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <form onSubmit={addBlog} >
                title : <input onChange={handleTitleChange} value={title}></input> <br/>
                author : <input onChange={handleAuthorChange} value={author}></input> <br/>
                url : <input onChange={handleUrlChange} value={url}></input> <br/>
                <button type='submit'> create </button>
            </form>
        </div>
    )
}

export default Create
