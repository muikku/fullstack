import React from 'react'
import { Item, Segment } from 'semantic-ui-react'

const User = ({ user }) => (<div>{
  user ?
    <div>
      <Segment>
        <Item
          header={<h2>{user.name}</h2>}
          extra={<div>
            <h3>Added blogs</h3>
            <ul>
              {user.blogs.map(b =>
                <li key={b._id}>
                  {b.title} by {b.author}
                </li>
              )}
            </ul>
          </div>}
        />
      </Segment>
    </div>
    : null
}</div>)

export default User
