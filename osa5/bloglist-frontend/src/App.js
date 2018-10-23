import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      blogAuthor: '',
      blogTitle: '',
      blogUrl: '',
      showAll: true,
      error: null,
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  } 

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      author: this.state.blogAuthor,
      title: this.state.blogTitle,
      url: this.state.blogUrl
    }

    blogService
    .create(blogObject)
    .then(newBlog => {
      this.setState({
        blogs: this.state.blogs.concat(newBlog),
        blogAuthor: '',
        blogTitle: '',
        blogUrl: ''
      })
    })
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 7000)
    }
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
    const loginForm = () => (
      <div>
        <h2>Kirjaudu</h2>

      <form onSubmit={this.login}>
      <div>
        käyttäjätunnus 
        <input
        type="text"
        name="username"
        value={this.state.username}
        onChange={this.handleLoginFieldChange}
        />
      </div>
      <div>
        salasana 
        <input
        type="password"
        name="password"
        value={this.state.password}
        onChange={this.handleLoginFieldChange}
        />
      </div>
      <button type="submit">kirjaudu</button>
      </form>

      </div>
    )

    const blogForm = () => (
      <div>
          <h2>Lisää uusi blogi</h2>

          <form onSubmit={this.addBlog}>
          <div>
            kirjoittaja 
            <input
            type="text"
            name="blogAuthor"
            value={this.state.blogAuthor}
            onChange={this.handleBlogFieldChange}
            />
            </div>
            <div>
            otsikko 
            <input
            type="text"
            name="blogTitle"
            value={this.state.blogTitle}
            onChange={this.handleBlogFieldChange}
            />
            </div>
            <div>
            url 
            <input
            type="text"
            name="blogUrl"
            value={this.state.blogUrl}
            onChange={this.handleBlogFieldChange}
            />
            </div>
            <button type="submit">tallenna</button>
          </form>
      </div>
    )

    return (
      <div>
        <Notification message={this.state.error} />

        {this.state.user === null ?
        loginForm() :
        blogForm()
        }
      

        <h2>blogs</h2>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
     </div>
    )
  }
}

export default App;
