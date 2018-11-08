const initialMessage = 'this is initial message'

const notificationReducer = (state = initialMessage, action) => {
  switch (action.type) {
  case 'NOTIFY':
    return action.message
  case 'CLEAR':
    return null
  default:
    return state
  }
}

export const notify = (message, time) => {
  return (dispatch) => {
    dispatch({
      type: 'NOTIFY',
      message: message
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, time * 1000)
  }
}

export default notificationReducer