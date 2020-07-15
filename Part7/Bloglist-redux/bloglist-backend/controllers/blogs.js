const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog.js')
const User = require('../models/user')

blogsRouter.get('/',async (request, response) => {
    
    const blogs = await Blog.find({}).populate('user',{blogs : 0})
    response.json(blogs.map((b) => b.toJSON()))
})

blogsRouter.post('/', async (request, response,next) => {

    const body = request.body
    const decodedToken = jwt.verify(request.token,process.env.SECRET)
    if(!request.token || !decodedToken.id)
    {
        response.status(401).json(
            {
                error : "Invalid or Missing token"
            }
        )
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title : body.title,
        author : body.author,
        url : body.url,
        likes : body.likes,
        comments : body.comments,
        user : user
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
        await user.save().catch(error => next(error))
        response.json(blog.toJSON())
    }
})

blogsRouter.delete('/:id', async (request,response,next) =>
{
    const decodedToken = jwt.verify(request.token,process.env.SECRET)
    if(!decodedToken.id && !request.token)
    {
        response.status(401).json(
            {
                error : "Invalid or Missing token"
            }
        )
    }
    const user = await User.findById(decodedToken.id)
    const index = user.blogs.indexOf(request.params.id)
    if(!(index > -1))
    {
        response.status(401).json(
            {
                error : "Wrong user for the blog"
            }
        )
    }
    await Blog.findByIdAndRemove(request.params.id).then()
    {
        response.status(204).end()
    }
    user.blogs.splice(index,1)
    await user.save().catch(error => next(error))
})

blogsRouter.put('/:id' , async (request,response) =>
{
    const body = request.body

    const updatedBlog = 
    {
        title : body.title,
        author : body.author,
        url : body.url,
        likes : body.likes,
        comments : body.comments
    }

    await Blog.findByIdAndUpdate(request.params.id , updatedBlog , {new : true})
              .then(update => {
                  response.json(update)
              })  
})

module.exports = blogsRouter