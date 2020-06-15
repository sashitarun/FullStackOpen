import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Create from './components/Create'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [message,setMessage]= useState(null)
  const [errorMessage,setErrorMessage]= useState(null)

  const blogFormRef = React.createRef()

  useEffect( () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((b1,b2)=> b2.likes - b1.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const Handlelogin = async (event) =>
  {
    event.preventDefault()
    const un = username
    const pass = password
    
      const loginuser = await loginService.login({username : un,password : pass})
      if(loginuser.username === username)
      {
          window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(loginuser)
          ) 
          blogService.setToken(loginuser.token)
          setUser(loginuser)
          setUsername('')
          setPassword('')
      } 
      else{
        setErrorMessage('Wrong Credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
      } 
  }

  const logout = () =>
  {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleUsernameChange = (event) =>
  {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) =>
  {
    setPassword(event.target.value)
  }

  const addBlog =(blogObject) =>
  {
    blogService.setToken(user.token)
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject)
               .then(returnedObject => setBlogs(blogs.concat(returnedObject)))
    setMessage(`A new blog ${blogObject.title} by ${blogObject.author} is added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000);
  }

  const increaseLikes = (blogObject) =>
  {
    const newBlog ={
      title : blogObject.title,
      author : blogObject.author,
      url : blogObject.url,
      likes : blogObject.likes + 1
    }
    blogService.update(blogObject.id,newBlog)
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((b1,b2)=> b2.likes - b1.likes)))

  }

  const loginForm = () =>
  {
    return(
      <div>
        <h2>login</h2>
        <form onSubmit={Handlelogin}>
          <div>
            username <input type='text' onChange={handleUsernameChange}></input>
          </div>
          <div>
            password <input type='password' autoComplete='on' onChange={handlePasswordChange}></input>
          </div>
          <div>
            <button type='submit'> login </button>
          </div>
        </form>
      </div>
    )
  }


  const blogsForm = () =>
  {
    return(
      <div>
        <h2>blogs</h2>
        <p>{user.username} is logged in </p> <button onClick={logout}> logout </button>
        <h2>create a new blog</h2>
        <Togglable buttonLabel='create' ref={blogFormRef}>
          <Create token={user.token} createBlog = {addBlog}/>
        </Togglable>
        {blogs.map(blog => {
          return(
          <Blog key={blog.id}  blog={blog} like={increaseLikes} />
          )
        }
        )}
      </div>
    )
  }

  return (
    <div>
      <Notification message={message} errorMessage={errorMessage} />
      {
        user === null ? loginForm() : blogsForm()
      }
    </div>
  )
}

export default App