import blogs from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'CREATE_BLOG':
    return action.data
  case 'INIT_BLOGS':
    return action.data
  case 'LIKE_BLOG': {
    const id = action.id
    const modifiedBlog = state.find(b => b._id === id)
    const filteredState = state.filter(b => b._id !== id)
    return filteredState.concat({ ...modifiedBlog, likes: modifiedBlog.likes + 1 })
  }
  case 'DELETE_BLOG':{
    const filteredState = state.filter(b => b._id !== action.id)
    return filteredState
  }
  default:
    return state
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    await blogs.create(blog)
    const content = await blogs.getAll()
    dispatch({
      type: 'CREATE_BLOG',
      data: content
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const content = await blogs.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: content
    })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    await blogs.update(likedBlog._id, likedBlog)
    const id = blog._id
    dispatch({
      type: 'LIKE_BLOG',
      id
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogs.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      id
    })
  }
}

export default blogReducer