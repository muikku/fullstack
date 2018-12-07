import React from 'react'

const User = ({user}) => (<div>{
     user ? 
        <div>
            <h1>{user.name}</h1>
            <h2>Added blogs</h2>
            <ul>
                {user.blogs.map(b => 
                <li key={b._id}>
                    {b.title} by {b.author}
                </li>
                )}
            </ul>
        </div>
     : null 
    }</div>)

export default User
