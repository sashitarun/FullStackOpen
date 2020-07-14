import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { addNewBlog, addLike, deleteBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'
import Create from './Create'
import Blog from './Blog'

function BlogForm() {

    const user = useSelector(state => state.user)
    const blogs = useSelector(state => state.blogs)

    const blogFormRef = React.createRef()
    
    const dispatch = useDispatch()

    const logout = () =>
    {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(setUser(null))
    }

    const addBlog = (blogObject) =>
    {
        blogFormRef.current.toggleVisibility()
        dispatch(addNewBlog(blogObject , user.token))
    }

    const increaseLikes = (blogObject) =>
    {
        const newBlog ={
        title : blogObject.title,
        author : blogObject.author,
        url : blogObject.url,
        likes : blogObject.likes + 1
        }
        dispatch(addLike(blogObject.id,newBlog))
    }

    const deleteSelectedBlog = (blogObject) => {
        dispatch(deleteBlog(blogObject,user))
    }

    return (
        <div>
            <h2>blogs</h2>
            <p>{user.name} is logged in </p> <button onClick={logout}> logout </button>
            <h2>create a new blog</h2>
            <Togglable buttonLabel='create' ref={blogFormRef}>
            <Create token={user.token} createBlog = {addBlog}/>
            </Togglable>
            {blogs.map(blog => {
            return(
            <Blog key={blog.id}  blog={blog}>
                <p>likes : {blog.likes} <button onClick={() => increaseLikes(blog)}>like</button></p>
                <button onClick={() => deleteSelectedBlog(blog)} >delete</button>
            </Blog>
            )
            }
            )}
        </div>
    )
}

export default BlogForm
