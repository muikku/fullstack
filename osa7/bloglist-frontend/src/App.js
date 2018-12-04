import React from 'react'
import { connect } from 'react-redux'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import { initializeBlogs, likeBlog, deleteBlog } from './reducers/blogReducer'
import { initializeUserBlogs } from './reducers/userBlogsReducer'
import { login, logout, initUser } from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'



class App extends React.Component {
  componentDidMount = async () => {
    this.props.initUser()

    this.props.initializeUserBlogs()
    
    this.props.initializeBlogs()
  } 
///sdfkjj

  render() {
    const loginForm = () => (
      <Togglable buttonLabel="login">
      <LoginForm      />
      </Togglable>
    )


    const logoutButton = () => (
        <button onClick={this.props.logout}>
        logout
        </button>
    )


    return (
      <div>
        <h1>blogs</h1>
        {this.props.notifications.map(e => e)}
      
        {this.props.user === null ?
        loginForm() :
        <div>
          <p>{this.props.user.username} logged in {logoutButton()}</p>
          
          <Togglable buttonLabel="new blog" ref={component => this.blogForm = component}>
          <BlogForm      />
          </Togglable>

          <BlogList />
        </div>
        }
     </div>
    )
  }
}


const mapStateToProps = (state) => {
  return  {
    showBlogs: state.blogs,
    user: state.user,
    notifications: state.notification
  }
}

export default connect(mapStateToProps, { initializeBlogs, initializeUserBlogs, login, logout, initUser, blogReducer, userReducer, deleteBlog, likeBlog })(App)
