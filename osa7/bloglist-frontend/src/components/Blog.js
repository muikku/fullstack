import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getComments, createComment } from './../reducers/commentsReducer'



const Blog = (props) => {
    const blog = props.blog
    const propsReady = () => (blog !== undefined && props.userBlogs !== undefined) ? true : false
    const onSubmit = (e) => {
        e.preventDefault()
        const comment = {message: e.target.message.value, blogId: blog._id }
        props.createComment(comment)
        ///notify
        e.target.message.value = ''
    }
        return (
            <div> {
                propsReady() ?
                <div className="content-after-click">
                    <div className="blog" key={blog._id}>
                    <div>{blog.title} {blog.author}</div>
                    <div>{blog.url}</div> 
                    <div>{blog.likes} likes {' '}
                    <button onClick={props.like}>like</button>
                    </div>
                    <div>added by {blog.user.name ? blog.user.name : 'anonymous'}</div>
                    {props.userBlogs.map(b => b._id).includes(blog._id) ? <button onClick={props.delete}>delete</button> : null}
                    </div>
                    <div>
                        <h2>comments</h2>
                        <form onSubmit={onSubmit}>
                        <input
                        name="message"
                        />
                        <button type="submit">add comment</button>
                        </form>
                        {props.comments.filter(c => c.blogId === blog._id).map(c => <div key={c._id}>{c.message}</div>)}
                    </div>
                </div>
                :
                null
            } </div>
        )
}

class Blogx extends React.Component {
    componentDidMount() {

    }
    componentDidUpdate() {

    }
    render() {
        return (
            <div>

            </div>
        )
    }
}

const deliverProps = (state) => {
    return {
        comments: state.comments
    }
}

export default connect(deliverProps, { getComments, createComment })(Blog)