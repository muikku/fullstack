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
                        sort by {props.theLabel}
                    </button>
                    <p>sorted by {props.theshowLabel}</p>
                </div>

              <ul>
                    {
                        props.showBlogs.map(blog =>
                        <div key={blog._id}>
                            <Blog
                                blog={blog} >
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



const label = (toggle) => toggle ? 'title' : 'most likes'

const showLabel = (toggle) => toggle ? 'most likes' : 'title'

const mapStateToProps = (state) => {
    return {
        showBlogs: blogsToShow(state.blogs, state.toggle),
        theLabel: label(state.toggle),
        theshowLabel: showLabel(state.toggle)
    }
}

export default connect(mapStateToProps, { likeBlog, deleteBlog, notify, toggle })(BlogList)