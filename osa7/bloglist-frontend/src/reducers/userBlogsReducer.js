import blogService from './../services/blogs'



 const userBlogsReducer = (state = [], action) => {
    switch(action.type) {
        case 'INITUSERBLOGS':
        return action.userBlogs
        case 'LOGOUT':
        return []
        default:
        return state
    }
}

export const initializeUserBlogs = () => {
    return async (dispatch) => {
        const loggedUserJson = window.localStorage.getItem('loggedBlogUser')
        const user = await JSON.parse(loggedUserJson)
        blogService.setToken(user.token)
        const userBlogs = await blogService.getUserBlogs()

        console.log('asdfasdfasdf', userBlogs)
        dispatch({
            type: 'INITUSERBLOGS',
            userBlogs
        })
    }
}

export const clear = () => {
    return async (dispatch) => {
        dispatch({
            type: 'CLEAR'
        })
    }
}

export default userBlogsReducer