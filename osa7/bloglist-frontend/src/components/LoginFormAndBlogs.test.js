import React from 'react'
import { mount } from 'enzyme'
import App from '../App'
import LoginForm from './LoginForm'
import Blog from './Blog'
jest.mock('../services/blogs')
import blogService from '../services/blogs'


describe('<App />', () => {
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('show only loginform when not logged in, no blogs', () => {
      app.update()
      const loginForm = app.find(LoginForm)
      const blog = app.find(Blog)

      expect(loginForm.length).toEqual(1)
      expect(blog.length).not.toEqual(blogService.blogs.length)
    })
  })




  describe('when user is logged', () => {
    beforeEach(() => {

      const user = {
        username: 'kersa',
        token: '$2b$10$CYonCgR.AmDO/K8eSf7cye83SK8ESk0m5ccolorITW1dQRtg4SfiS',
        name: 'Titta Markkanen'
      }

      localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      app = mount(<App />)
    })

    it('renders blogs after login', () => {
      app.update()
      const blog = app.find(Blog)
      expect(blog.length).toEqual(blogService.blogs.length)
    })
  })


})