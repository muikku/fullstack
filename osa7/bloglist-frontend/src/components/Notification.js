import React from 'react'

import { Message } from 'semantic-ui-react'

const Notification = ({ message }, boolean) => {
  if (message === null) {
    return null
  }

  return (
    <div key={message.toString()}>

      {boolean ?
        <Message positive>
          <Message.Header>{message}</Message.Header>
        </Message>
        :
        <Message negative>
          <Message.Header>{message}</Message.Header>
        </Message>
      }

    </div>
  )
}



export default Notification