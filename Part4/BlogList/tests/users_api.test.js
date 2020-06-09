const User = require('../models/user')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const blog_helper = require('./blog_helper')


beforeEach(async () => 
{
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash("testpassword",10)
    const newUser = new User({username:'test1',passwordHash})
    await newUser.save()
})

describe('Tests while adding new users', () => {

    test('if a user can be added', async () => {
        const usersBeforeAddition = await blog_helper.usersInDB()
        const newUser = {
            username:'test2',
            name : 'testing',
            password : 'testpassword',
        }
        await api.post('/api/users')
                 .send(newUser)
                 .expect(200)
                 .expect('Content-Type', /application\/json/)
        
        const usersAfterAddition = await blog_helper.usersInDB()
        expect(usersAfterAddition).toHaveLength(usersBeforeAddition.length + 1)
        
        const usernames = usersAfterAddition.map(u => u.username)
        expect(usernames).toContain('test2')
    })

    test('should check if invalid users cant be added', async () => {

        const newUser1 = 
        {
            username : "he",
            password : "cadcva"
        }

        await api.post('/api/users')
                 .send(newUser1)
                 .expect(400)

        const newUser2 =
        {
            username : "test",
            password : "ps"
        }

        await api.post('/api/users')
                 .send(newUser2)
                 .expect(400)

    })  
})

afterAll(() =>
{
    mongoose.connection.close()
})
