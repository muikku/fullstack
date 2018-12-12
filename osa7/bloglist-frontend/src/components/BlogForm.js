import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from './../reducers/blogReducer'
import { getUsers } from './../reducers/usersReducer'
import { notify } from './../reducers/notificationReducer'
import { Form, Button } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'


class blogForm extends React.Component {
  state = {
    redir: false,
    id: null
  }

    onSubmit = async (e) => {
      e.preventDefault()
      e.persist()
      const blogProperties = [e.target.blogAuthor.value, e.target.blogTitle.value, e.target.blogUrl.value]
      if(blogProperties.includes(undefined || null || '')){
        this.props.notify('all fields must be filled', false, 5000)
        return null
      }
      try{
        this.props.createBlog({
          author: e.target.blogAuthor.value,
          title: e.target.blogTitle.value,
          url: e.target.blogUrl.value,
          likes: 0
        })

        this.props.getUsers()
        this.props.notify(`a new blog ${e.target.blogTitle.value} by ${e.target.blogAuthor.value} added`, true, 5000)

        e.target.blogAuthor.value = ''
        e.target.blogTitle.value = ''
        e.target.blogUrl.value = ''

        const userblogs = this.props.usersBlogs.reverse()
        const id = userblogs[0]._id

        this.setState({
          redir: true,
          id
        })

      }catch(exception){
        console.log(exception)
        this.props.notify('could not add blog :(', false, 5000)
      }
    }
    render() {
      if(this.state.redir){
        const path = `/blogs/${this.state.id}`
        return (<Redirect to={path}/>)
      }
      return (
        <div>
          <h2>create new blog</h2>

          <Form onSubmit={this.onSubmit}>
            <Form.Field>
              <label>author </label>
              <input
                name="blogAuthor"
              />
            </Form.Field>
            <Form.Field>
              <label>title</label>
              <input
                name="blogTitle"

              />
            </Form.Field>
            <Form.Field>
              <label>url</label>
              <input
                name="blogUrl"
              />
            </Form.Field>
            <Button type="submit">create</Button>
          </Form>
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    usersBlogs: state.userBlogs
  }
}

export default connect(mapStateToProps, { createBlog, notify, getUsers })(blogForm)