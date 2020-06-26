import React from 'react'
import Togglable from './Togglable'

const Blog = (props) =>{

  const blog = props.blog

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

return(
  <div style={blogStyle}>
    {blog.title} {blog.author}
    <Togglable buttonLabel='view'>
      <p>{blog.url} </p>
      <p>{blog.user.name} created this</p>
      {props.children}
    </Togglable>
  </div>
) }

export default Blog
