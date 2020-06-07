const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const blogHelper = require('./blog_helper')


beforeEach(async ()=>
{
    await Blog.deleteMany({})

    let blogObject = new Blog(blogHelper.initialBlogs[0])
    await blogObject.save()

    blogObject =  new Blog(blogHelper.initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})
    
test('should check number blogs', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(blogHelper.initialBlogs.length)
})

test('Check if blog is added', async () => {
    const newBlog = 
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10
    }
    
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
    
    const presentBlogs = await blogHelper.blogsInDB()
    expect(presentBlogs).toHaveLength(blogHelper.initialBlogs.length + 1)
    
    const authors = presentBlogs.map( b => b.author)
    expect(authors[2]).toBe('Robert C. Martin')
})

afterAll(()=>
{
    mongoose.connection.close()   
})
