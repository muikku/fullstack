import React from 'react'

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
        const likeABlog = this.props.likeABlog
        const user = this.props.blog.user ? this.props.blog.user.name : 'anonymous'
        const remove = this.props.remove
        const removeButton = () => (
            <div>
            <button onClick={remove}>delete</button>
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
                    <button onClick={likeABlog}>like</button>
                    </div>
                    <div>added by {user}</div>
                    {remove ? removeButton() : null}
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Blog