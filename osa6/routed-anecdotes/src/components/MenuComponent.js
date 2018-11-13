import React from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const MenuComponent = () => (
    <Menu inverted color='grey'>
    <Menu.Item link>
    <NavLink to="/anecdotes" activeStyle={menyStyle}>anecdotes</NavLink>
    </Menu.Item>
    <Menu.Item link>
    <NavLink to="/create" activeStyle={menyStyle}>create new</NavLink> &nbsp;
    </Menu.Item>
    <Menu.Item link>
    <NavLink to="/about" activeStyle={menyStyle}>about</NavLink> &nbsp;
    </Menu.Item>
    </Menu>
)

const menyStyle = {
    color: 'white',
    borderRadius: 12,
    padding: 12,
    fontStyle: 'houston',
    fontSize: 15,
    backgroundColor: '#66965F'
  }

export default MenuComponent