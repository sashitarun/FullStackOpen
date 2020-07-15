import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { addNewBlog, addLike, deleteBlog, addNewComment } from '../reducers/blogReducer'
import Togglable from './Togglable'
import Create from './Create'
import Blog from './Blog'
import { BrowserRouter as Router,
        Link, Switch, Route, useParams, Redirect } from 'react-router-dom'
import { Table, Navbar, Nav } from 'react-bootstrap'
import {allUsers} from '../reducers/usersReducer'
import Comment from './Comment'

function BlogForm() {

    const user = useSelector(state => state.user)
    const users = useSelector(state => state.users)
    const blogs = useSelector(state => state.blogs)

    const blogFormRef = React.createRef()
    
    const dispatch = useDispatch()

    const Logout = () =>
    {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(setUser(null))
        return(
            <Redirect to='/' />
        )
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
        comments : blogObject.comments,
        likes : blogObject.likes + 1
        }
        dispatch(addLike(blogObject.id,newBlog))
    }

    const addComment = (blogObject,newComment) => {
        const oldComments = blogObject.comments
        const changedComments = oldComments.concat(newComment)
        const newBlog = {...blogObject,comments : changedComments}
        dispatch(addNewComment(blogObject.id,newBlog))
    }

    const deleteSelectedBlog = async (blogObject) => {
        await dispatch(deleteBlog(blogObject,user))
        await dispatch(allUsers())
    }

    const UserDisplay = () => {
        const id = useParams().id
        const requiredUser = users.find(u => u.id === id)
        return(
            <div>
                <h2>{requiredUser.name}</h2>
                <h3>added blogs</h3>
                <ul>
                    {
                        requiredUser.blogs.map( bl => 
                            <li key={bl.id}>
                                {bl.title}
                            </li>
                            )
                    }
                </ul>
            </div>
        )
    }

    const BlogDisplay = () =>{
        const id = useParams().id
        const requiredBlog = blogs.find(b => b.id === id)
        return(
            <div>
                <h2>{requiredBlog.title}</h2>
                <p>written by {requiredBlog.author}</p>
                <p>{requiredBlog.url}</p>
                <p>{requiredBlog.likes} likes <button onClick={() => increaseLikes(requiredBlog)}>like</button></p>
                <button onClick={() => deleteSelectedBlog(requiredBlog)} >delete</button>
                <p>added by <strong>{requiredBlog.user.name}</strong></p>
                <h3>comments</h3>
                <Comment add={addComment} blog={requiredBlog}/>
                <ul>
                    {
                        requiredBlog.comments.map( comment => 
                            <li key={comment}>
                                {comment}
                            </li>)
                    }
                </ul>
            </div>
        )
    }

    const padding = {
        padding: 5
      }

    return (
        <Router>
            <Navbar collapseOnSelect expand='lg' bg='light' variant='light'>
                <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='mr-auto'>
                        <Nav.Link href="#" as="span">
                            <Link style={padding} to="/">blogs</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            <Link style={padding} to="/users">users</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            <Link style={padding} to="/create">create</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span" color='black'>
                            {user
                            ? <em>{user.name} logged in</em>
                            : null
                            }
                        </Nav.Link>
                        <Nav.Link href='#' as='span'>
                            <Link style={padding} to='/logout'>logout</Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {/* <div>
                <h2>Blogs</h2>
                <p>{user.name} is logged in </p> <button onClick={logout}> logout </button>
            </div> */}
            <Switch>
                <Route path='/users/:id'>
                    <UserDisplay />
                </Route>
                <Route path='/blogs/:id'>
                    <BlogDisplay />
                </Route>
                <Route path='/logout'>
                    <Logout />
                </Route>
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
                                        <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
                                        <td>{u.blogs.length}</td>
                                    </tr> )}
                            </tbody>
                        </Table>
                    </div>
                </Route>
                <Route path='/create'>
                <div>
                    <h2>create a new blog</h2>
                    <Togglable buttonLabel='create' ref={blogFormRef}>
                        <Create token={user.token} createBlog = {addBlog}/>
                    </Togglable>
                </div>
                </Route>
                <Route path='/'>
                    <div>
                        <h2>Blogs</h2>
                        {blogs.map(blog => {
                        return(
                        <Blog key={blog.id}  blog={blog} />
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
