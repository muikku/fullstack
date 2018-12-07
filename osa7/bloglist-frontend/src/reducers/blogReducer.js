import blogs from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch(action.type) {
        case 'CREATE':
        return state.concat(action.content)
        case 'INIT':
        return action.content
        case 'LIKE':
        const id = action.id
        const blogToLike = state.find(b => b._id === id)
        const changedBlog = { ...blogToLike, likes: blogToLike.likes + 1 }
        return state.map(b => b._id !== id ? b : changedBlog)
        case 'DELETE':
        let otherfilteredStore = state.filter(b => b._id !== action.id)
        return otherfilteredStore
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
        const likedBlog = { ...blog, likes: blog.likes + 1 }
        const updatedBlog = await blogs.update(likedBlog._id, likedBlog)
        dispatch({
            type: 'VOTE',
            id: updatedBlog._id
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