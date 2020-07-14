const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/' , async (request,response,next) =>
{
    const body = request.body
    const saltRounds = 10
    if(body.password.length < 3)
    {
        response.status(400).end()
    }
    else{

    const passwordHash = await bcrypt.hash(body.password,saltRounds)
    const user = new User({
        username : body.username,
        name : body.name,
        passwordHash
    })
    const savedUser = await user.save().catch(error => next(error))                     
    response.json(savedUser)
    }
    
})

usersRouter.get('/', async (request,response) =>
{
    const users = await User.find({}).populate('blogs',{likes : 0 , user : 0})
    response.json(users.map( u => u.toJSON()))
})

module.exports = usersRouter