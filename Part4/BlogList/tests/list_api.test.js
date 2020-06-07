const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const blogHelper = require('./blog_helper')


beforeEach(async ()=>
{
    await Blog.deleteMany({})
    const blogs = blogHelper.initialBlogs.map(bl => new Blog(bl))
    const promiseArray = blogs.map(bl => bl.save())
    await Promise.all(promiseArray) 
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

test('to check if id atrribute is present', async () => {

    const presentBlogs = await blogHelper.blogsInDB()
    expect(presentBlogs.map(b => b.id)).toBeDefined()    
})

test('to check whether , if a new blog with no likes attribute get added and the default likes is set to zero ', async () =>
{
    const newBlog = 
    {
        title: "Rage of Angels",
        author: "Sidney Sheldon",
        url: "https://www.goodreads.com/book/show/43328.Rage_of_Angels"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
    
    const presentBlogs = await blogHelper.blogsInDB()
    const len = blogHelper.initialBlogs.length
    expect(presentBlogs[len].likes).toEqual(0)          
})

test('to check if status 400 comes when a blog without title/url when tried to add', async () =>
{
    const newBlog1 = 
    {
        title: "Rage of Angels",
        author: "Sidney Sheldon"
    }

    await api
        .post('/api/blogs')
        .send(newBlog1)
        .expect(400)
    
    const newBlog2 = 
    {
        author: "Sidney Sheldon",
        url: "https://www.goodreads.com/book/show/43328.Rage_of_Angels"
    }

    await api
        .post('/api/blogs')
        .send(newBlog2)
        .expect(400)
})


afterAll(()=>
{
    mongoose.connection.close()   
})
