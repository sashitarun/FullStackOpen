
export const setNotification = (content,time) =>
{
    return async dispatch => {
        dispatch({
            type : 'DISPLAY',
            data : {content}
        })
        setTimeout(() => {
            dispatch({
                type : 'CLEAR'
            })
        }, time);
    }
}

const notificationReducer = (state = '',action) => {
    switch(action.type){
        case 'DISPLAY':
            return action.data.content
        case 'CLEAR' :
            return ''
        default : return state
    }
}

export default notificationReducer
