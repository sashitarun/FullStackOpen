const blogsRouter = require('express').Router()

const Blog = require('../models/blog.js')
const User = require('../models/user')

blogsRouter.get('/',async (request, response) => {
    
    const blogs = await Blog.find({}).populate('user',{blogs : 0})
    response.json(blogs.map((b) => b.toJSON()))
})

blogsRouter.post('/', async (request, response) => {

    const body = request.body
    const user = await User.findById(body.userId)

    const blog = new Blog({
        title : body.title,
        author : body.author,
        url : body.url,
        likes : body.likes,
        user : user._id
    })

    if(typeof(blog.url) === "undefined" || typeof(blog.title) === "undefined")
    {
        response.status(400).end()
    }
    else{
        if(typeof(blog.likes) === "undefined")
        {
            blog.likes = 0
        }
        await blog.save()
        user.blogs = user.blogs.concat(blog._id)
        await user.save()
        response.json(blog.toJSON())
    }
})

blogsRouter.delete('/:id', async (request,response) =>
{
    await Blog.findByIdAndRemove(request.params.id).then()
    {
        response.status(204).end()
    }
})

blogsRouter.put('/:id' , async (request,response) =>
{
    const body = request.body

    const updatedBlog = 
    {
        title : body.title,
        author : body.author,
        url : body.url,
        likes : body.likes
    }

    await Blog.findByIdAndUpdate(request.params.id , updatedBlog , {new : true})
              .then(update => {
                  response.json(update)
              })  
})

module.exports = blogsRouter