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

export const notify = (message) => {
  return ({
    type: 'NOTIFY',
    message: message
  })
}

export const clear = () => {
  return(
    {
      type: 'CLEAR'
    }
  )
}


export default notificationReducer