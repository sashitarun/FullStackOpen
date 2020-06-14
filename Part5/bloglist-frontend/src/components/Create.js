import React,{useState } from 'react'

const Create = ({createBlog}) => {

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
        //blogService.create(newBlog)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={addBlog} >
            title : <input onChange={handleTitleChange}></input> <br/>
            author : <input onChange={handleAuthorChange}></input> <br/>
            url : <input onChange={handleUrlChange}></input> <br/>
            <button type='submit'> create </button>
        </form>
    )
}

export default Create
