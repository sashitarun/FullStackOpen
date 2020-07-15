import blogService from '../services/blogs'

export const initialiseBlogs = () =>
{
    return async dispatch => {
        await blogService.setToken()
        const presentBlogs = await blogService.getAll()
        dispatch({
            type : 'INITIALISE',
            data : {
                presentBlogs : presentBlogs
            }
        })
    }
} 

export const addNewBlog = (blogObject , token) => {
    return async dispatch => {
        await blogService.setToken(token)
        const addedBlog = await blogService.create(blogObject)
        dispatch({
            type : 'ADD_BLOG',
            data : {
                newBlog : addedBlog
            }
        })
    }
}

export const addLike = (id,blogObject) => {
    return async dispatch => {
        const updatedBlog = await blogService.update(id,blogObject)
        dispatch({
            type : 'ADD_LIKE',
            data : {
                id : updatedBlog.id
            }
        })
    }
}

export const addNewComment = (id,blogObject) => {
    return async dispatch => {
        const updatedBlog = await blogService.update(id,blogObject)
        dispatch({
            type : 'ADD_COMMENT',
            data : {
                comments : updatedBlog.comments,
                id : updatedBlog.id
            }
        })
    }
}

export const deleteBlog = (blogObject , user) => {
    return async dispatch => {
        if(window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`))
        {
            if(blogObject.user.username === user.username)
            {
                await blogService.setToken(user.token)
                await blogService.remove(blogObject.id)
                dispatch({
                    type : 'DELETE_BLOG',
                    data : {
                        id : blogObject.id
                    }
                })
            }
            else{
                dispatch({
                    type : 'WRONG_USER_TO_DELETE'
                })
            }
        }
    }
}

const blogReducer = (state = [], action) => {
    switch(action.type){
        case 'INITIALISE':
            const presentState = action.data.presentBlogs
            let sortedState = presentState.sort((b1,b2) => b2.likes - b1.likes)
            return sortedState
        case 'ADD_BLOG':
            const newBlog = action.data.newBlog
            return state.concat(newBlog)
        case 'ADD_LIKE':
            let id = action.data.id
            let requiredBlog = state.find(blog => blog.id === id)
            let changedBlog = {...requiredBlog,likes : requiredBlog.likes + 1}
            let newState = state.map(blog => blog.id === id ? changedBlog : blog)
            sortedState = newState.sort((b1,b2) => b2.likes - b1.likes)
            return sortedState
        case 'ADD_COMMENT':
            id = action.data.id
            requiredBlog = state.find(blog => blog.id === id)
            changedBlog = {...requiredBlog,comments : action.data.comments}
            newState = state.map(blog => blog.id === id ? changedBlog : blog)
            return newState
        case 'DELETE_BLOG':
            const blogid = action.data.id
            const changedBlogs = state.filter(blog => blog.id !== blogid)
            return changedBlogs
        case 'WRONG_USER_TO_DELETE':
            console.log('Wrong User , So cant delete this blog')
            return state
        default : return state
    }
}

export default blogReducer
