import React from 'react'
import { connect } from 'react-redux'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import { initializeBlogs, likeBlog, deleteBlog } from './reducers/blogReducer'
import { initializeUserBlogs } from './reducers/userBlogsReducer'
import { login, logout, inituser } from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import blogService from './services/blogs'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import { getUsers } from './reducers/usersReducer'

const Blogs = () => {
  return (
    <div>
      <Togglable buttonLabel="new blog">
      <BlogForm      />
      </Togglable>

      <BlogList />
    </div>
  )
}

class App extends React.Component {
  componentDidMount = async () => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJson){
      const user = await JSON.parse(loggedUserJson)
      blogService.setToken(user.token)
      this.props.inituser(user)
      this.props.initializeUserBlogs()
    }
    this.props.initializeBlogs()
    this.props.getUsers()
  } 


  render() {


    const logoutButton = () => (
        <button onClick={this.props.logout}>
        logout
        </button>
    )

    const frontpage = () => {
      return (<div>{this.props.user === null ?
      <Togglable buttonLabel="login">
      <LoginForm      />
      </Togglable>
       :
<div>
  <p>{this.props.user.username} logged in {logoutButton()}</p>
      {Blogs()}
</div>
}
</div>)
    }

    return (
      <div>
        <Router>
          <div>
  
          <h1>blog app</h1>        <div>
           <Link to="/blogs">blogs</Link>
            <Link to="/users">users</Link>
          </div>
        {this.props.notifications.map(e => e)}
          <Route exact path="/" render={() => frontpage()} />
          <Route exact path="/blogs" render={() => Blogs()} />
          <Route exact path="/users" render={() => 
          <Users users={this.props.users}/>} 
          />
          <Route exact path="/users/:id" render={({match}) => 
            <User user={this.props.users.find(u => u._id === match.params.id)} />}
          />
      
          </div>
        </Router>
     </div>
    )
  }
}


const mapStateToProps = (state) => {
  return  {
    showBlogs: state.blogs,
    user: state.user,
    notifications: state.notification,
    users: state.users
  }
}

export default connect(mapStateToProps, { initializeBlogs, initializeUserBlogs, inituser, getUsers, login, logout, blogReducer, userReducer, deleteBlog, likeBlog })(App)
