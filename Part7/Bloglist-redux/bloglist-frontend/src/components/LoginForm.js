import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUsername } from '../reducers/usernameReducer'
import { setPassword } from '../reducers/passwordReducer'
import { tryLogin } from '../reducers/loginReducer'


function LoginForm() {

    const dispatch = useDispatch()
    const username = useSelector(state => state.username)
    const password = useSelector(state => state.password)

    const Handlelogin =  async (event) =>
    {
        event.preventDefault()
        
        dispatch(tryLogin({username : username, password : password}))
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
           <h2>login</h2>
            <form onSubmit={Handlelogin}>
            <div>
                username <input id='username' type='text' onChange={handleUsernameChange}></input>
            </div>
            <div>
                password <input id ='password' type='password' autoComplete='on' onChange={handlePasswordChange}></input>
            </div>
            <div>
                <button type='submit'> login </button>
            </div>
            </form>
        </div>
    )
}

export default LoginForm
