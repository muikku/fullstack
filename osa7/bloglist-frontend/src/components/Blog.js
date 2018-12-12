import React from 'react'
import { connect } from 'react-redux'
import { getComments, createComment } from './../reducers/commentsReducer'
import { likeBlog, deleteBlog } from './../reducers/blogReducer'
import { notify } from './../reducers/notificationReducer'
import { Button, Form, Item, Segment } from 'semantic-ui-react'

const Blog = (props) => {
  const blog = props.blog

  ///How does it work without this?
  const propsReady = () => (blog && props.userBlogs !== undefined) ? true : false

  /// Handle Comment Submit
  const submitComment = (e) => {
    e.preventDefault()
    const blogProperties = [e.target.message.value]
    if(blogProperties.includes(undefined || null || '')){
      props.notify('comment field was empty', false, 5000)
      return null
    }
    const comment = { message: e.target.message.value, blogId: blog._id }
    props.createComment(comment)
    props.notify(`comment was added to blog ${blog.title}`, true, 5000)
    e.target.message.value = ''
  }
  /// Handle Liking
  const handleLike = (e) => {
    e.preventDefault()
    props.likeBlog(blog)
    props.notify(`liked blog ${blog.title}`, true, 5000)
  }
  /// Handle Delete
  const handleDelete = (e) => {
    e.preventDefault()
    props.deleteBlog(blog._id)
    props.notify(`deleted blog ${blog.title}`, false, 5000)
    props.history.push('/blogs')
  }
  return (
    <div> {
      propsReady() ?
        <div>
          <Segment>
            <Item
              header={<h2>{blog.title}</h2>}
              meta={blog.author}
              description={<div><p>{blog.url}</p>added by {blog.user.name ? blog.user.name : 'anonymous'}</div>}
              extra={<div>{blog.likes} likes {' '}</div>}
            />
          </Segment>
          <div>
            <Form onSubmit={submitComment}>
              <Button type="submit">add comment</Button>
              <Button onClick={handleLike}>like</Button>
              {props.userBlogs.map(b => b._id).includes(blog._id) ? <Button onClick={handleDelete}>delete</Button> : null}
              <Segment>
                <p>comments</p>
                <Form.Field>
                  <input
                    name="message"
                  />
                </Form.Field>
                <ul className="ui list">
                  {props.comments.filter(c => c.blogId === blog._id).map(c => <li key={c._id}>{c.message}</li>)}
                </ul>
              </Segment>
            </Form>
          </div>
        </div>
        :
        null
    } </div>
  )
}

const deliverProps = (state) => {
  return {
    comments: state.comments,
    blogs: state.blogs,
    userBlogs: state.userBlogs
  }
}

export default connect(deliverProps, { getComments, createComment, likeBlog, deleteBlog, notify })(Blog)