import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initialiseBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { allUsers } from './reducers/usersReducer'

const App = () => {

  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialiseBlogs())
    dispatch(allUsers())
  },[dispatch])

  useEffect( async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])

  return (
    <div className='container'>
      {
        user === null ? <LoginForm /> : <BlogForm />
      }
    </div>
  )
}

export default App