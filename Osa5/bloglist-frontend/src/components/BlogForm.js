import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ onSubmit, handleLoginFieldChange, newBlogTitle, newBlogAuthor, newBlogUrl, newBlogLikes }) => {

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={onSubmit}>
        <div>
          Title:
      <input
            name="newBlogTitle"
            value={newBlogTitle}
            onChange={handleLoginFieldChange}
          />
          <div>
          </div>
          Author:
      <input
            name="newBlogAuthor"
            value={newBlogAuthor}
            onChange={handleLoginFieldChange}
          />
          <div>
          </div>
          Url:
      <input
            name="newBlogUrl"
            value={newBlogUrl}
            onChange={handleLoginFieldChange}
          />
          <div>
          </div>
          Likes:
      <input
            name="newBlogLikes"
            value={newBlogLikes}
            onChange={handleLoginFieldChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleLoginFieldChange: PropTypes.func.isRequired,
  newBlogTitle: PropTypes.string.isRequired,
  newBlogAuthor: PropTypes.string.isRequired,
  newBlogUrl: PropTypes.string.isRequired,
  newBlogLikes: PropTypes.string.isRequired
}

export default BlogForm