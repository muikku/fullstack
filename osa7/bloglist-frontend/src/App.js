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
import Blog from './components/Blog'
import { notify } from './reducers/notificationReducer'
import { getComments } from './reducers/commentsReducer'



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
    this.props.getComments()
    this.props.getUsers()
  } 


  render() {


    const loggedIn = () => (
      <div>
      {this.props.user.username} logged in
        <button onClick={this.props.logout}>
        logout
        </button>
      </div>
    )

    const frontpage = () => {
      return (<div>{this.props.user === null ?
      <Link to="/login">login</Link>
       :
      <div>
        {loggedIn()}
      </div>
      }
      </div>)
    }

    const FindBlog = (id) => this.props.showBlogs.find(b => b._id === id)

    return (
      <div>
        <Router>
          <div>
  
          <h1>blog app</h1>        
  
        {this.props.notifications.map(e => e)}
        <div>
            <Link to="/blogs">blogs</Link>
            <Link to="/users">users</Link>
          </div>
          <Route path="/" render={() => frontpage()} />
          <Route exact path="/login" render={({history}) => <LoginForm history={history} login={this.props.login} notify={this.props.notify}/>} />
          
          {this.props.user ? <div>
   
          <Route exact path="/blogs" render={() => Blogs()} />
          <Route exact path="/users" render={() => 
          <Users users={this.props.users}/>} 
          />
          <Route exact path="/users/:id" render={({match}) => 
            <User user={this.props.users.find(u => u._id === match.params.id)} />}
          />
          <Route exact path="/blogs/:id" render={({match}) => 
          <Blog 
          blog={FindBlog(match.params.id)} 
          like={() => this.props.likeBlog(FindBlog(match.params.id))}
          userBlogs={this.props.userBlogs}
          delete={() => this.props.deleteBlog(match.params.id)}
          /> 
          }
          />
          </div>
          :
          null
        }
      
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
    users: state.users,
    userBlogs: state.userBlogs
  }
}

export default connect(mapStateToProps, { initializeBlogs, getComments, initializeUserBlogs, inituser, getUsers, login, logout, notify, blogReducer, userReducer, deleteBlog, likeBlog })(App)
