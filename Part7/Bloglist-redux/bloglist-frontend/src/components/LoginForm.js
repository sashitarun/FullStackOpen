import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUsername } from '../reducers/loginDetails'
import { setPassword } from '../reducers/loginDetails'
import { Button } from 'react-bootstrap'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'

function LoginForm() {

    const dispatch = useDispatch()
    const loginDetails = useSelector(state => state.loginDetails)
    const username = loginDetails.username
    const password = loginDetails.password

    const Handlelogin =  async (event) =>
    {
        event.preventDefault()
        
        const loginuser = await loginService.login({username : username, password : password})
        if(loginuser.username === username)
        {
            window.localStorage.setItem('loggedBlogappUser',JSON.stringify(loginuser))
            dispatch(setUser(loginuser))
            dispatch(setUsername(''))
            dispatch(setPassword(''))
            await blogService.setToken(loginuser.token)
        }
        else{
            console.log('Wrong Credentials')
        }
    }

    const handleUsernameChange = (event) =>
    {
        dispatch(setUsername(event.target.value))
    }
    const handlePasswordChange = (event) =>
    {
        dispatch(setPassword(event.target.value))
    }
    return (
        <div>
           <h2>Login</h2>
            <form onSubmit={Handlelogin}>
            <div>
                Username <input id='username' type='text' onChange={handleUsernameChange}></input>
            </div>
            <div>
                Password <input id ='password' type='password' autoComplete='on' onChange={handlePasswordChange}></input>
            </div>
            <div>
                <Button variant='secondary' type='submit'>login</Button>
            </div>
            </form>
        </div>
    )
}

export default LoginForm
