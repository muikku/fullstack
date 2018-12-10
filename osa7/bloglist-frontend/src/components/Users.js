import { Link } from 'react-router-dom'
import React from 'react'


const Users = ({ users }) => {
  const halfmappedUsers = users.map(u => ({ name: u.name, path:`/users/${u._id}`, blogs: u.blogs.length, _id: u._id }))
  return (
    <div className="ui raised segments">
      <div className="ui horizontal segments">
        <div className="ui segment bottom attached">users</div>
        <div className="ui segment bottom attached">blogs added</div>
      </div>
      {halfmappedUsers.map(u =>
        <div key={u.key} className="ui horizontal top attached segments">
          <div className="ui segment top attached">
            <Link to={u.path}>{u.name}</Link>
          </div>
          <div className="ui segment top attached">{u.blogs}</div>
        </div>)
      }
    </div>
  )
}

export default Users