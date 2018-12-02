import blogs from '../services/blogs'

const blogReducer = (store = [], action) => {
    switch(action.type) {
        case 'CREATE':
        return store.concat(action.content)
        case 'INIT':
        return action.content
        case 'LIKE':
        const id = action.content.id
        const blogToChange = store.find(a => a.id === id)
        const alteredBlog = { ...blogToChange, votes: blogToChange.votes + 1 }
        return store.map(a => a.id !== id ? a : alteredBlog)
        case 'DELETE':
        let otherfilteredStore = store.filter(b => b.id !== action.id)
        return otherfilteredStore
        default:
        return store
    }
}

export const createBlog = (blog) => {
    return async (dispatch) => {
        const createdblog = await blogs.create(blog)
        console.log(createBlog)
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
            content: updatedBlog
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