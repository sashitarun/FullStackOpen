import loginService from "../services/login"
import blogService from '../services/blogs'


export const setUser = (userObject) => 
{
    if(userObject === null)
    {
        return async dispatch => {
            dispatch({
                type : 'WRONG_USER'
            })
        }
    }
    else return async dispatch => {
        dispatch({
            type : 'SET_USER',
            data : {userObject}
        })
    }
}

function userReducer(state = null, action) {
    switch (action.type) {
        case 'SET_USER':
            return action.data.userObject
        case 'WRONG_USER':
            return null
        default:
            return state
    }
}

export default userReducer
