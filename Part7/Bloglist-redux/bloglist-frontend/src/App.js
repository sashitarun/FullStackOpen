import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initialiseBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {

  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialiseBlogs())
  },[dispatch])

  useEffect( async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])

  return (
    <div>
      {
        user === null ? <LoginForm /> : <BlogForm />
      }
    </div>
  )
}

export default App