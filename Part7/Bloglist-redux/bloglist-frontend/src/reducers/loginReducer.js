import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from './userReducer'
import { setPassword } from './passwordReducer'
import { setUsername } from './usernameReducer'

export const tryLogin =  (usernameObject) => 
{
    if(usernameObject === null)
    {
        return dispatch => {
            dispatch({
                type : 'FAILURE'
            })
        }
    }
    return async dispatch => {
        const loginuser = await loginService.login(usernameObject)
        if(loginuser.username === usernameObject.username)
        {
            window.localStorage.setItem('loggedBlogappUser',JSON.stringify(loginuser))
            dispatch(setUser(loginuser))
            dispatch(setUsername(''))
            dispatch(setPassword(''))
            await blogService.setToken(loginuser.token)
            dispatch({
                type : 'SUCCESS',
                data : {loginuser : loginuser}
            })
        }
        else{
            dispatch({
                type : 'FAILURE'
            })
        }
    }
}

function loginReducer(state = null , action) {
    switch (action.type) {
        case 'SUCCESS':
            return action.data.loginuser
        case 'FAILURE':
            return null
        default : return state
    }
}

export default loginReducer
