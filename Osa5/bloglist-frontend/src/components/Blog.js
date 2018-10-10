import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      likes: this.props.blog.likes
    }
  }

  render() {

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div style={blogStyle}>
        <div>{this.props.blog.title}</div>
        <div>{this.props.blog.author}</div>
        <div>{this.props.blog.url}</div>
        <div>{this.state.likes} likes <button onClick={this.props.updateBlog}>Like!</button></div>
        <div>Added by {this.props.blog.user.name}  </div>
      </div>
    )
  }
}

export default Blog