import loginService from './../services/login'
import blogService from './../services/blogs'

const userReducer = (state = null, action) => {
    switch(action.type) {
        case 'LOGIN':
        return action.data
        case 'LOGOUT':
        return null
        default:
        return state
    }
}

export const inituser = (user) => {
    return async (dispatch) => {
        dispatch({
            type: 'LOGIN',
            data: user
        })
    }
}

export const login = (username, password) => {
    return async (dispatch) => {
        const user = await loginService.login({username: username, password: password})
        window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
        dispatch({
            type: 'LOGIN',
            data: user
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