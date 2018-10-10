import React from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, deleteButtonVisible }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const visible = { display: deleteButtonVisible ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div className="title">{blog.title}</div>
      <div className="author">{blog.author}</div>
      <div>{blog.url}</div>
      <div>{blog.likes} likes <button onClick={updateBlog}>Like!</button></div>
      <div>Added by {blog.user.name}  </div>
      <button onClick={deleteBlog} style={visible}> Delete </button>
    </div>
  )
}


export default Blog