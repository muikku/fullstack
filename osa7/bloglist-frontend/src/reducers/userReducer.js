import loginService from './../services/login'
import blogService from './../services/blogs'

const defaultUser = () => {
  const loggedUserJson = window.localStorage.getItem('loggedBlogUser')
  if (loggedUserJson){
    const user = JSON.parse(loggedUserJson)
    blogService.setToken(user.token)
    return user
  }
  return null
}

const userReducer = (state = defaultUser(), action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  case 'GET_USER':
    return state
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
    try{
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user
      })
      return(true)
    }catch(error){
      console.log(error)
      return(null)
    }
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