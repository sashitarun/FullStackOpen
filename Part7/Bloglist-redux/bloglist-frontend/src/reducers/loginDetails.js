const initialState = {
    username : '',
    password : ''
}
export const setPassword = (name) => {
    return dispatch => {
        dispatch({
            type : 'SET_PASSWORD',
            data : {name}
        })
    }
}

export const setUsername = (name) => {
    return dispatch => {
        dispatch({
            type : 'SET_USERNAME',
            data : {name}
        })
    }
}


function loginDetails(state = initialState, action) {
    switch (action.type) {
        case 'SET_USERNAME':
            return {...state,username: action.data.name}
        
        case 'SET_PASSWORD':
            return {...state, password : action.data.name}
    
        default:
            return state
    }
}

export default loginDetails
