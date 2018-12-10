import React from 'react'
import { connect } from 'react-redux'
import { toggle } from '../reducers/toggleReducer'
import { notify } from './../reducers/notificationReducer'
import { likeBlog, deleteBlog } from './../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { Table, Button } from 'semantic-ui-react'

const BlogList = (props) => {
  return (
    <div>
      <div>
        <Button onClick={() => props.toggle()}>
                        sort by {props.theLabel}
        </Button>
      </div>
      <Table>
        <Table.Body>
          {
            props.showBlogs.map(b =>
              <Table.Row key={b._id}>
                <Table.Cell>
                  <Link key={b._id} to={`/blogs/${b._id}`}>{b.title} by {b.author}</Link>
                </Table.Cell>
              </Table.Row>
            )
          }
        </Table.Body>
      </Table>
    </div>
  )}



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