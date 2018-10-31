import React from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Blog from './components/Blog'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      blogs: [],
      blogAuthor: '',
      blogTitle: '',
      blogUrl: '',
      showAll: true,
      notification: [],
      username: '',
      password: '',
      user: null,
      userBlogs: []
    }
  }

  componentDidMount() {

    const loggedUserJson = window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      this.setState({user})
      blogService.setToken(user.token)
    }

    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    ).catch(error => {
      console.log(error)
    })

    blogService.getUserBlogs().then(userBlogs =>
      this.setState({ userBlogs })
      ).catch(error => {
        console.log(error)
      })

  } 

  notify = (message, type) => {
    const theNotification = Notification({message}, type)
    const boolean = this.state.notification.map(e => e.key).includes(theNotification.key)
    this.setState({
      notification: boolean ? this.state.notification : this.state.notification.concat(theNotification),
    })
    setTimeout(() => {
      this.setState({ notification: this.state.notification.filter(e => e !== theNotification) })
    }, 5000)
  } ///voisi siirtää komponenttiin..


  addBlog = async (event) => {
    event.preventDefault()
    const blogProperties = [this.state.blogAuthor, this.state.blogTitle, this.state.blogUrl]

    if(blogProperties.includes(undefined || null || "")){
      this.notify('all fields must be filled', "error")
      return null
    }

    this.blogForm.toggleVisibility()

    try{
    const blogObject = await blogService.create({
      author: this.state.blogAuthor,
      title: this.state.blogTitle,
      url: this.state.blogUrl,
      likes: 0
    })

    this.setState({
      blogs: this.state.blogs.concat(blogObject),
      blogAuthor: '',
      blogTitle: '',
      blogUrl: ''
    })

    this.notify(`a new blog ${blogObject.title} by ${blogObject.author} added`, "success")
    
    }catch(exception){
      console.log(exception)
      this.notify('could not add blog :(', "error")
    }
    this.componentDidMount()
  }

  likeABlog = (id) => {
    return async () => {
      const blog = this.state.blogs.find(b => b._id === id)
      const changedBlog = {
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: blog.likes += 1,
        user: blog.user
      }

      try{
        const updatedBlog = await blogService.update(id, changedBlog)
        this.setState({ blogs: this.state.blogs.map(b => b.id !== id ? b : updatedBlog)})
        this.notify(`you liked ${updatedBlog.title} ${updatedBlog.author}`, "success")
      }catch (error) {
        this.notify(`liking failed, blog ${blog} has been removed`, "error")
        this.setState({
          blogs: this.state.blogs.filter(b => b.id !== id)
        })
      }
    }
  }

  removeBlog = (id) => {
    return async () => {
    
    const blog = this.state.blogs.find(b => b._id === id)
    if(window.confirm(`delete ${blog.title} by ${blog.author}?`)) {
    try{
      await blogService.remove(id)

      this.setState({
        blogs: this.state.blogs.filter(b => b.id !== blog._id)
      })
      this.componentDidMount()

      this.notify(`${blog.title} ${blog.author} was deleted`, "success")
    } catch (error) {
      this.notify(`could not delete blog`, "error")
    }
}}
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
      this.findUserBlogs()
      this.notify(`welcome ${user.username}`, "success")
    } catch (exception) {
      this.notify('wrong username or password', "error")
    }
  }



  logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    this.setState({
      user: null,
      userBlogs: []
    })
    blogService.setToken(null)
    this.notify('signed out', "success")
  }

  findUserBlogs = () => {
    blogService.getUserBlogs().then(userBlogs =>
      this.setState({ userBlogs })
      ).catch(error => {
        console.log(error)
      })
  }

  handleBlogFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  render() {
    const BlogsToShow = 
    this.state.showAll ?
      this.state.blogs.sort((a, b) => b.likes - a.likes) :
      this.state.blogs.sort((a, b) => a.title.localeCompare(b.title))


    const label = !this.state.showAll ? 'most likes' : 'title'
    const showLabel = this.state.showAll ? 'most likes' : 'title'

    const loginForm = () => (
      <Togglable buttonLabel="login">
      <LoginForm
      username={this.state.username}
      password={this.state.password}
      handleChange={this.handleLoginFieldChange}
      handleSubmit={this.login}
      />
      </Togglable>
    )

    const blogForm = () => (
      <Togglable buttonLabel="new blog" ref={component => this.blogForm = component}>
      <BlogForm
      onSubmit={this.addBlog}
      author={this.state.blogAuthor}
      title={this.state.blogTitle}
      url={this.state.blogUrl}
      handleChange={this.handleBlogFieldChange}
      />
      </Togglable>
    )

    const logoutButton = () => (
        <button onClick={this.logout}>
        logout
        </button>
    )
    
    const checkIfAuthorized = (id) => {
      const array = this.state.userBlogs.map(e => e._id)
      return (array.includes(id))
    }

    return (
      <div>
        <h1>blogs</h1>
        {this.state.notification}
      
        {this.state.user === null ?
        loginForm() :
        <div>
          <p>{this.state.user.name} logged in {logoutButton()}</p>
          
          {blogForm()}
          <p></p>
                <div>
                <button onClick={this.toggleVisible}>
                sort by {label}
                </button>
                <p>sorted by {showLabel}</p>
              </div>

              <ul>
                {BlogsToShow.map(blog =>
                <div key={blog._id}>
                <Blog 
                blog={blog} 
                likeABlog={this.likeABlog(blog._id)} 
                remove={checkIfAuthorized(blog._id) ? this.removeBlog(blog._id) : null}> 
                </Blog>
                </div>)}
              </ul>
        </div>
        }
     </div>
    )
  }
}

export default App;
