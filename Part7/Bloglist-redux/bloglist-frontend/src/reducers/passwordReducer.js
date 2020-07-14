export const setPassword = (name) => {
    return dispatch => {
        dispatch({
            type : 'SET_PASSWORD',
            data : {name}
        })
    }
}

function passwordReducer( state = '' , action) {
    switch(action.type){
        case 'SET_PASSWORD' : return action.data.name
        default : return state
    }
}

export default passwordReducer
