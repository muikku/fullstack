import blogs from '../services/blogs'

const commentsReducer = (state = [], action) => {
  switch(action.type) {
  case 'CREATECOMMENT':
    return state.concat(action.content)
  case 'INITCOMMENTS':
    return action.content
  default:
    return state
  }
}

export const createComment = (comments) => {
  return async (dispatch) => {
    const aBlogsComments = await blogs.commentBlog(comments)
    dispatch({
      type: 'CREATECOMMENT',
      content: aBlogsComments
    })
  }
}

export const getComments = () => {
  return async (dispatch) => {
    const content = await blogs.getComments()
    dispatch({
      type: 'INITCOMMENTS',
      content
    })
  }
}

export default commentsReducer