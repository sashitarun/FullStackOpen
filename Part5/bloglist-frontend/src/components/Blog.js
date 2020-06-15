import React,{useState} from 'react'

const Blog = ({ blog, like, deleteBlog}) =>{

const [toView,setToView] = useState(false)

const hideWhenVisible = { display: toView ? 'none' : '' }
const showWhenVisible = { display: toView ? '' : 'none' }

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const toggleView = () =>
{
  setToView(!toView)
}

return(
  <div style={blogStyle}>
    <div style={hideWhenVisible}>
      {blog.title} {blog.author} 
      <button onClick={toggleView}>view</button>
    </div>
    <div style={showWhenVisible}>
      {blog.title} {blog.author} 
      <button onClick={toggleView}>cancel</button> 
      <p>{blog.url}</p>
      <p>likes : {blog.likes} <button onClick={() => like(blog)}>like</button></p>
      <p>{blog.user.name} created this</p>
      <button onClick={() => deleteBlog(blog)}>delete</button>
    </div>
  </div>
) }

export default Blog
