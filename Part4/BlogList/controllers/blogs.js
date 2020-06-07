const blogsRouter = require('express').Router()

const Blog = require('../models/blog.js')

blogsRouter.get('/',async (request, response) => {
    
    const blogs = await Blog.find({})
    response.json(blogs.map((b) => b.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
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
        response.json(blog.toJSON())
    }
})

module.exports = blogsRouter