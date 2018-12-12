import { Menu, Button, Header } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from './../reducers/userReducer'
import { notify } from './../reducers/notificationReducer'
import React from 'react'

const Navigator = (props) => {
  const handleLogout = () => {
    props.logout()
    props.notify('logged out', true, 5000)
  }
  return (
    <div>
      <Menu>
        <Menu.Item>
          <Header as='h1' style={{ fontWeight: 'bold' }}>blog app</Header>
        </Menu.Item>
        {props.user
          ?
          <Menu.Menu><Menu.Item  link >
            <NavLink activeStyle={{ fontWeight: 'bold' }} to="/blogs">blogs</NavLink>
          </Menu.Item>
          <Menu.Item link>
            <NavLink activeStyle={{ fontWeight: 'bold' }} to="/users">users</NavLink>
          </Menu.Item></Menu.Menu>
          :
          null
        }
        <Menu.Menu position='right'>
          <Menu.Item >
            {props.user
              ?
              <Header as='h4'>{props.user.name} logged in &nbsp;<Button onClick={() => handleLogout()}>logout</Button></Header>
              :
              <NavLink to="/login">login</NavLink>
            }
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { notify, logout })(Navigator)