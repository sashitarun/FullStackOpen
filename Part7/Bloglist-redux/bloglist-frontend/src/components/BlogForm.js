import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { addNewBlog, addLike, deleteBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'
import Create from './Create'
import Blog from './Blog'
import { BrowserRouter as Router,
        Link, Switch, Route, useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import {allUsers} from '../reducers/usersReducer'

function BlogForm() {

    const user = useSelector(state => state.user)
    const users = useSelector(state => state.users)
    const blogs = useSelector(state => state.blogs)

    const blogFormRef = React.createRef()
    
    const dispatch = useDispatch()

    const logout = () =>
    {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(setUser(null))
    }

    const addBlog = async (blogObject) =>
    {
        blogFormRef.current.toggleVisibility()
        await dispatch(addNewBlog(blogObject , user.token))
        await dispatch(allUsers())
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

    const deleteSelectedBlog = async (blogObject) => {
        await dispatch(deleteBlog(blogObject,user))
        await dispatch(allUsers())
    }

    const padding = {
        padding: 5
      }

    return (
        <Router>
            <div>
                <h2>blogs</h2>
                <p>{user.name} is logged in </p> <button onClick={logout}> logout </button>
            </div>
            <div>
                <Link style={padding} to='/users'>Users</Link>
                <Link style={padding} to='/blogs'>Blogs</Link>
            </div>
            <Switch>
                <Route path='/users'>
                    <div>
                        <h2>Users</h2>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Users</th>
                                    <th>No. of Blogs</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u =>
                                    <tr key={u.id}>
                                        <td><Link to={`/${u.id}`}>{u.name}</Link></td>
                                        <td>{u.blogs.length}</td>
                                    </tr> )}
                            </tbody>
                        </Table>
                    </div>
                </Route>
                <Route path='/blogs'>
                <div>
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
                </Route>
            </Switch>
        </Router>
    )
}

export default BlogForm
