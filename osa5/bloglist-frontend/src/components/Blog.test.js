import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'



describe('<Blog />', () => {
    let blog 
    let blogComponent

    beforeEach(() => {
        blog = {
            author: 'Mirjam Tavaste',
            title: 'Totuus E koodeista',
            url: 'vehreys.fi',
            likes: 20046
        }

        blogComponent = shallow(
            <Blog
            blog={blog}
            />
        )
    })

    it('renders author and title before click', () => {
        const contentDiv = blogComponent.find('.content-before-click')

        expect(contentDiv.text()).toContain(blog.author, blog.title)
    })

     it('renders also url and likes after 1 click', () => {


        const button = blogComponent.find('.toggle1')
        button.simulate('click')

        const contentDiv = blogComponent.find('.content-after-click')

        expect(contentDiv.text()).toContain(blog.url, blog.likes)
    }) 
})