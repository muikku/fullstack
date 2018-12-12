/* eslint-disable react/display-name */
import { Tab } from 'semantic-ui-react'
import BlogList from './../components/BlogList'
import BlogForm from './../components/BlogForm'
import React from 'react'

const Blogs = () => {
  return (
    <div>
      <Tab
        menu={{ secondary: true, pointing: true }}
        panes={
          [
            { menuItem: 'Blogs', render: () => <Tab.Pane attached={false}>
              <BlogList />
            </Tab.Pane> },
            { menuItem: 'Create new', render: () => <Tab.Pane attached={false}>
              <BlogForm />
            </Tab.Pane> }
          ]
        }
      />
    </div>
  )
}

export default Blogs