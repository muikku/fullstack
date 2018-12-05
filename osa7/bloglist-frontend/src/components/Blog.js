import React from 'react'
import { likeBlog, deleteBlog } from './../reducers/blogReducer'
import { notify } from './../reducers/notificationReducer'
import { connect } from 'react-redux'

class Blog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    toggleVisibility = () => {
        this.setState({ visible: !this.state.visible })
    }

    render() {
        const hideWhenVisible = { display: this.state.visible ? 'none' : ''}
        const showWhenVisible = { display: this.state.visible ? '' : 'none'}
        const blog = this.props.blog
        const user = () => blog.user ? blog.user.name : 'anonymous'

        const removeButton = () => (
            <div>
            <button onClick={() => this.props.deleteBlog(blog._id)}>delete</button>
            </div>
        )
        return (
            <div>

                <div onClick={this.toggleVisibility} style={hideWhenVisible} className="toggle1">
                <div className="content-before-click">
                    <div className="blog" key={blog.id}>{blog.title} {blog.author}</div>
                </div>
                </div>

                <div onClick={this.toggleVisibility} style={showWhenVisible} className="toggle2">
                <div className="content-after-click">
                    <div className="blog" key={blog.id}>
                    <div>{blog.title} {blog.author}</div>
                    <div>{blog.url}</div> 
                    <div>{blog.likes} likes {' '}
                    <button onClick={() => this.props.likeBlog(blog)}>like</button>
                    </div>
                    <div>added by {user()}</div>
                    {this.props.userBlogs.includes(blog._id) ? removeButton() : null}
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

const userBlogsIds = (blogs) => {
    const ids = blogs.map(b => b._id)
    return ids
}

const mapStateToProps = (state) => {
    return {
        userBlogs: userBlogsIds(state.userBlogs)
    }
}

export default connect(mapStateToProps, { likeBlog, deleteBlog, notify })(Blog)