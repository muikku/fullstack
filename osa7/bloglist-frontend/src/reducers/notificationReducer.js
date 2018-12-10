import Notification from './../components/Notification'

const notificationReducer = (state = [], action) => {
  switch(action.type) {
  case 'NOTIFY': {
    const newState = state.map(n => n.key).includes(action.notification.key) ? state : state.concat(action.notification)
    return newState
  }
  case 'HIDE': {
    const newState = state.filter(n => n.key !== action.key)
    return newState
  }
  default:
    return state
  }
}

export const notify = (message, type, time) => {
  return (dispatch) => {
    const notification = Notification({ message }, type)
    dispatch({
      type: 'NOTIFY',
      notification
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE',
        key: notification.key
      })
    }, time)
  }
}

export default notificationReducer