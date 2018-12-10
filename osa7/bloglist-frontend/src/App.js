/* eslint-disable react/display-name */
import React from 'react'
import { connect } from 'react-redux'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import { initializeBlogs, likeBlog, deleteBlog } from './reducers/blogReducer'
import { initializeUserBlogs } from './reducers/userBlogsReducer'
import { login, logout, inituser } from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import blogService from './services/blogs'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import { getUsers } from './reducers/usersReducer'
import Blog from './components/Blog'
import { notify } from './reducers/notificationReducer'
import { getComments } from './reducers/commentsReducer'
import { Container, Tab } from 'semantic-ui-react'
import Navigator from './components/Navigator'

const Blogs = () => {
  return (
    <div>
      <Tab
        menu={{ secondary: true, pointing: true }}
        panes={
          [
            { menuItem: 'Blogs', render: () => <Tab.Pane attached={false}>
              <BlogList />
            </Tab.Pane> },
            { menuItem: 'Create new', render: () => <Tab.Pane attached={false}>
              <BlogForm />
            </Tab.Pane> }
          ]
        }
      />
    </div>
  )
}

class App extends React.Component {
  componentDidMount () {
    const loggedUserJson = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      blogService.setToken(user.token)
      this.props.inituser(user)
      this.props.initializeUserBlogs()
    }
    this.props.initializeBlogs()
    this.props.getComments()
    this.props.getUsers()
  }

  render() {
    return (
      <Container>
        <div>
          <Router>
            <div>
              <h1>blog app</h1>
              <Navigator user={this.props.user} logout={this.props.logout}/>
              {this.props.notifications.map(e => e)}

              <Route exact path="/login" render={({ history }) => <LoginForm history={history} login={this.props.login} notify={this.props.notify}/>} />

              {this.props.user ? <div>

                <Route exact path="/blogs" render={() => Blogs()} />
                <Route exact path="/users" render={() =>
                  <Users users={this.props.users}/>}
                />
                <Route exact path="/users/:id" render={({ match }) =>
                  <User user={this.props.users.find(u => u._id === match.params.id)} />}
                />
                <Route exact path="/blogs/:id" render={({ match }) =>
                  <Blog
                    id={match.params.id}
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
      </Container>
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

export default connect(mapStateToProps,
  { initializeBlogs,
    getComments,
    initializeUserBlogs,
    inituser,
    getUsers,
    login,
    logout,
    notify, blogReducer, userReducer, deleteBlog, likeBlog })(App)
