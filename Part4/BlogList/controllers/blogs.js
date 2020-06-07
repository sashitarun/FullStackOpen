const blogsRouter = require('express').Router()

const Blog = require('../models/blog.js')

blogsRouter.get('/',async (request, response) => {
    
    const blogs = await Blog.find({})
    response.json(blogs.map((b) => b.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    await blog.save()
    response.json(blog.toJSON())
})

module.exports = blogsRouter