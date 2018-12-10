import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'



describe('<SimpleBlog />', () => {

  it('renders content', () => {
    const blog = {
      author: 'Mirjam Tavaste',
      title: 'Totuus E koodeista',
      url: 'vehreys.fi',
      likes: 20046
    }

    const blogComponent = shallow(<SimpleBlog blog={blog}/>)
    const contentDiv = blogComponent.find('.content')

    expect(contentDiv.text()).toContain(blog.author, blog.title, blog.likes)
  })

  it('clicking like twice adds two likes', () => {
    const blog = {
      author: 'Mirjam Tavaste',
      title: 'Totuus E koodeista',
      url: 'vehreys.fi',
      likes: 20046
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(
      <SimpleBlog
        blog={blog}
        onClick={mockHandler}
      />
    )

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})