import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from './../reducers/blogReducer'
import { notify } from './../reducers/notificationReducer'
import { Form, Button } from 'semantic-ui-react'


class blogForm extends React.Component {
    onSubmit = async (e) => {
      e.preventDefault()
      e.persist()
      const blogProperties = [e.target.blogAuthor.value, e.target.blogTitle.value, e.target.blogUrl.value]
      if(blogProperties.includes(undefined || null || '')){
        this.props.notify('all fields must be filled', 'error', 5000)
        return null
      }
      try{
        this.props.createBlog({
          author: e.target.blogAuthor.value,
          title: e.target.blogTitle.value,
          url: e.target.blogUrl.value,
          likes: 0,
          user: this.props.user._id
        })


        this.props.notify(`a new blog ${e.target.blogTitle.value} by ${e.target.blogAuthor.value} added`, 'success', 5000)

        e.target.blogAuthor.value = ''
        e.target.blogTitle.value = ''
        e.target.blogUrl.value = ''

      }catch(exception){
        console.log(exception)
        this.props.notify('could not add blog :(', 'error', 5000)
      }
    }
    render() {
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
    user: state.user
  }
}

export default connect(mapStateToProps, { createBlog, notify })(blogForm)