import React from 'react'
import { connect } from 'react-redux'
import { getComments, createComment } from './../reducers/commentsReducer'
import { likeBlog, deleteBlog } from './../reducers/blogReducer'
import { notify } from './../reducers/notificationReducer'
import { Button, Form, Item, Segment } from 'semantic-ui-react'



const Blog = (props) => {
  const blog = props.blogs.find(b => b._id === props.id)
  const propsReady = () => (blog && props.userBlogs !== undefined) ? true : false
  const submitComment = (e) => {
    e.preventDefault()
    const comment = { message: e.target.message.value, blogId: blog._id }
    props.createComment(comment)
    props.notify(`Comment was added to blog ${blog.title}`, 'success', 5000)
    e.target.message.value = ''
  }
  const handleLike = (e) => {
    e.preventDefault()
    props.likeBlog(blog)
    props.notify(`Liked blog ${blog.title}`, 'success', 5000)
  }
  const handleDelete = (e) => {
    e.preventDefault()
    props.deleteBlog(blog._id)
    props.notify(`Deleted blog ${blog.title}`, 'error', 5000)
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
              extra={<div>{props.blogs.filter(b => b._id === blog._id).map(b => b.likes)} likes {' '}</div>}
            />
          </Segment>
          <div>
            <Button type="submit">add comment</Button>
            <Button onClick={handleLike}>like</Button>
            {props.userBlogs.map(b => b._id).includes(blog._id) ? <Button onClick={handleDelete}>delete</Button> : null}

            <Segment>
              <p>comments</p>
              <Form onSubmit={submitComment}>
                <Form.Field>
                  <input
                    name="message"
                  />
                </Form.Field>
              </Form>
              <ul className="ui list">
                {props.comments.filter(c => c.blogId === blog._id).map(c => <li key={c._id}>{c.message}</li>)}
              </ul>
            </Segment>
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