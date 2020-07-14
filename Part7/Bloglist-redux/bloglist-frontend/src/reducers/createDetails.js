const initialstate = {
    title : '',
    author : '',
    url : ''
}
export const changeTitle = (title) => {
    return dispatch => {
        dispatch({
            type : 'CHANGE_TITLE',
            data : {
                title : title
            }
        })
    }
}
export const changeAuthor = (author) => {
    return dispatch => {
        dispatch({
            type : 'CHANGE_AUTHOR',
            data : {
                author : author
            }
        })
    }
}
export const changeUrl = (url) => {
    return dispatch => {
        dispatch({
            type : 'CHANGE_URL',
            data : {
                url : url
            }
        })
    }
}
function createDetails(state = initialstate , action) {
    switch (action.type) {
        case 'CHANGE_TITLE':
            return {...state, title : action.data.title}
        case 'CHANGE_AUTHOR':
            return {...state, author : action.data.author}
        case 'CHANGE_URL':
            return {...state, url : action.data.url}
        default: return state
    }
}

export default createDetails
