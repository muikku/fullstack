import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'
import { toggle } from '../reducers/toggleReducer'
import { notify } from './../reducers/notificationReducer'
import { likeBlog, deleteBlog } from './../reducers/blogReducer'

    


const BlogList = (props) => (
            <div>
                <div>
                    <button onClick={() => props.toggle()}>
                        sort by {props.thelabel}
                    </button>
                    <p>sorted by {props.theshowLabel}</p>
                </div>

              <ul>
                    {
                        props.showBlogs.map(blog =>
                        <div key={blog._id}>
                            <Blog 
                                blog={blog} 
                                likeABlog={() => props.likeBlog(blog)} 
                                remove={props.deletableByUser.includes(blog._id) ? props.deleteBlog(blog._id) : null}> 
                            </Blog>
                        </div>
                        )
                    }
              </ul>
            </div>
)



const blogsToShow = (blogs, toggle) => {
    const BlogsToShow = 
    toggle ?
      blogs.sort((a, b) => b.likes - a.likes) :
      blogs.sort((a, b) => a.title.localeCompare(b.title))

  return BlogsToShow
}

const label = (toggle) => !toggle ? 'most likes' : 'title'

const showLabel = (toggle) => toggle ? 'most likes' : 'title'

const deletableBlogs = (blogs) => {
    console.log(blogs)
    return blogs.map(e => e._id)
}

const mapStateToProps = (state) => {
    return {
        showBlogs: blogsToShow(state.blogs, state.toggle),
        deletableByUser: deletableBlogs(state.userBlogs),
        theLabel: label(state.toggle),
        theshowLabel: showLabel(state.toggle)
    }
}

export default connect(mapStateToProps, { likeBlog, deleteBlog, notify, toggle })(BlogList)