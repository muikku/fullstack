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
    const userBlogs = await blogService.getUserBlogs()
    dispatch({
      type: 'INITUSERBLOGS',
      userBlogs
    })
  }

}

export const refreshUserBlogs = () => {
  return async (dispatch) => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      blogService.setToken(user.token)
      const userBlogs = await blogService.getUserBlogs()
      dispatch({
        type: 'INITUSERBLOGS',
        userBlogs
      })
    } else {
      dispatch(console.log('get user blog failed'))
    }
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