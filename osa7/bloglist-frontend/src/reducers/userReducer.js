import loginService from './../services/login'
import blogService from './../services/blogs'

const defaultState = async () => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJson){
      const user = await JSON.parse(loggedUserJson)
      blogService.setToken(user.token)
/*       const userBlogs = await blogService.getUserBlogs() */
        return user
    }
    return null
}

const userReducer = (state = defaultState(), action) => {
    switch(action.type) {
        case 'LOGIN':
        return action.user
        case 'LOGOUT':
        return null
        default:
        return state
    }
}


export const login = (username, password) => {
    return async (dispatch) => {
        const user = await loginService.login({username: username, password: password})
        blogService.setToken(user.token)
/*         const userBlogs = await blogService.getUserBlogs() */
        window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
        dispatch({
            type: 'LOGIN',
            user
        })
    }
}

export const logout = () => {
    return async (dispatch) => {
        blogService.setToken(null)
        window.localStorage.removeItem('loggedBlogUser')
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export default userReducer