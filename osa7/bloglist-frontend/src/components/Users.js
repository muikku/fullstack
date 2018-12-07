import { Link } from 'react-router-dom'
import React from 'react'

const Users = ({users}) => {
    const halfmappedUsers = users.map(u => ({name: u.name, path:`/users/${u._id}`, blogs: u.blogs.length, _id: u._id}))
    return (
        <div>

            <p>blogs added</p>
            {halfmappedUsers.map(u => <div key={u._id}><Link to={u.path}>{u.name}</Link> {u.blogs}</div>)}

        </div>
    )
}

export default Users