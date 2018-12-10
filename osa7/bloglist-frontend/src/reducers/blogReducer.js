import blogs from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'CREATE':
    return state.concat(action.content)
  case 'INIT':
    return action.content
  case 'LIKE': {
    console.log('changedBlog', action.changedBlog)
    const filteredState = state.filter(b => b._id !== action.changedBlog._id)
    return filteredState.concat(action.changedBlog)
  }
  case 'DELETE':{
    const filteredState = state.filter(b => b._id !== action.id)
    return filteredState
  }
  default:
    return state
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const createdblog = await blogs.create(blog)
    dispatch({
      type: 'CREATE',
      content: createdblog
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const content = await blogs.getAll()
    dispatch({
      type: 'INIT',
      content
    })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    console.log('unchanged blog', blog)
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogs.update(likedBlog._id, likedBlog)
    dispatch({
      type: 'LIKE',
      changedBlog: updatedBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogs.remove(id)
    dispatch({
      type: 'DELETE',
      id
    })
  }
}

export default blogReducer