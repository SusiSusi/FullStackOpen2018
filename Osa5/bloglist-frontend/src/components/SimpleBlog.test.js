import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  const blog = {
    title: 'Testing render',
    author: 'Miisa Irmeli',
    likes: 4
  }

  const blogComponent = shallow(<SimpleBlog blog={blog} />)

  it('renders title and author', () => {
    const contentTitle = blogComponent.find('.content')
    expect(contentTitle.text()).toContain(blog.title)
    expect(contentTitle.text()).toContain(blog.author)
  })

  it('renders likes', () => {
    const contentTitle = blogComponent.find('.likes')
    expect(contentTitle.text()).toContain(blog.likes)
  })

  it('clicking the button twice calls event handler twice', () => {
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