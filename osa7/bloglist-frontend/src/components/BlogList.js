import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'
import { toggle } from '../reducers/toggleReducer'
import { notify } from './../reducers/notificationReducer'
import { likeBlog, deleteBlog } from './../reducers/blogReducer'

const deletable = async (blogs, id) => {
        const acceptedBlogs = await blogs
        console.log('this is id', id, 'here are accepted', acceptedBlogs)
        const isItDeletable = acceptedBlogs.map(b => b._id).includes(id)
        console.log('deletable here', isItDeletable)
        return isItDeletable
}


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
                                remove={props.userBlogs.includes(blog._id) ? () => props.deleteBlog(blog._id) : null}> 
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

const userBlogsIds = (blogs) => {
    const ids = blogs.map(b => b._id)
    return ids
}

const label = (toggle) => !toggle ? 'most likes' : 'title'

const showLabel = (toggle) => toggle ? 'most likes' : 'title'

const mapStateToProps = (state) => {
    console.log(state.userBlogs)
    console.log(state.blogs)
    return {
        showBlogs: blogsToShow(state.blogs, state.toggle),
        userBlogs: userBlogsIds(state.userBlogs),
        theLabel: label(state.toggle),
        theshowLabel: showLabel(state.toggle)
    }
}

export default connect(mapStateToProps, { likeBlog, deleteBlog, notify, toggle })(BlogList)