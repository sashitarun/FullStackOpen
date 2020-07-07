
export const voteNotification = (content) =>
{
    return({
        type : 'VOTING',
        data : {
            anecdoteName : content
        }
    })
}

export const newAnecdoteNotification = (content) =>
{
    return ({
        type : 'CREATED',
        data : {
            anecdoteContent : content
        }
    })
}

export const clearNotification = () =>
{
    return({
        type : 'CLEAR'
    })
}

const notificationReducer = (state = '',action) => {
    switch(action.type){
        case 'VOTING':
            return `you voted '${action.data.anecdoteName}' `
        case 'CREATED' :
            return `new anecdote '${action.data.anecdoteContent}' created `
        case 'CLEAR' :
            return ''
        default : return state
    }
}

export default notificationReducer
