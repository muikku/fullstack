import { Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import React from 'react'

const Navigator = (props) => {
  return (
    <div>
      <Menu inverted>
        <Menu.Item link>
          <Link to="/blogs">blogs</Link>
        </Menu.Item>
        <Menu.Item link>
          <Link to="/users">users</Link>
        </Menu.Item>
        <Menu.Item link>
          {props.user
            ? <em>{props.user.name} logged in <Button onClick={() => props.logout()} >logout</Button></em>
            : <Link to="/login">login</Link>
          }
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default Navigator