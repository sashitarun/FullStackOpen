import usersService from '../services/users'

export const allUsers = () => 
{
    return async dispatch => {
        const users = await usersService.getAll()
        dispatch({
            type : 'GET_USERS',
            data : {
                users : users
            }
        })
    }
}

function usersReducer(state = [] , action) {

    switch (action.type) {
        case 'GET_USERS':
            return action.data.users
    
        default:
            return state
    }
}

export default usersReducer
