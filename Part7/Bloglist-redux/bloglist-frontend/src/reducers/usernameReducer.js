export const setUsername = (name) => {
    return dispatch => {
        dispatch({
            type : 'SET_USERNAME',
            data : {name}
        })
    }
}

function usernameReducer( state = '' , action) {
    switch(action.type){
        case 'SET_USERNAME' : return action.data.name
        default : return state
    }
}

export default usernameReducer
