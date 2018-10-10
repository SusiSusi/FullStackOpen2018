import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Testing render',
    author: 'Miisa Irmeli',
    likes: 4,
    url: 'www.xx.fi',
    user: {name: 'Urmeloid'}
  }

  const blogComponent = shallow(<Blog blog={blog} />)

  it('renders title and author', () => {
    const contentTitle = blogComponent.find('.title')
    const contentAuthor = blogComponent.find('.author')
    expect(contentTitle.text()).toContain(blog.title)
    expect(contentAuthor.text()).toContain(blog.author)
  })
})