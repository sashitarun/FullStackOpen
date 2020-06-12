import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Create from './components/Create'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [message,setMessage]= useState(null)
  const [errorMessage,setErrorMessage]= useState(null)
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl]= useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
            password <input type='password' onChange={handlePasswordChange}></input>
          </div>
          <div>
            <button type='submit'> login </button>
          </div>
        </form>
      </div>
    )
  }

  const createBlog = (event) =>
  {
   // event.preventDefault()
    blogService.setToken(user.token)
    const newBlog = {
      title : title,
      author : author,
      url : url
    }
    blogService.create(newBlog)
    // blogService.getAll().then(blogs =>
    //   setBlogs( blogs )
    // )
    // setMessage(`A New Blog ${title} by ${author} added`)
    // setTimeout(() => {
    //   setMessage(null)
    // }, 5000)
    // setTitle('')
    // setAuthor('')
    // setUrl('')
  }


  const blogsForm = () =>
  {
    return(
      <div>
        <h2>blogs</h2>
        <p>{user.username} is logged in </p> <button onClick={logout}> logout </button>
        <h2>create a new blog</h2>
        <Create 
          handleTitleChange={handleTitleChange} 
          handleAuthorChange={handleAuthorChange} 
          handleUrlChange={handleUrlChange}
          createBlog={createBlog}
        />
        {blogs.map(blog => {
          return(
          <Blog key={blog.id}  blog={blog} />
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