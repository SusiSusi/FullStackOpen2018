import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlogTitle: '',
      newBlogAuthor: '',
      newBlogUrl: '',
      newBlogLikes: '',
      username: '',
      password: '',
      user: '',
      error: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBloggappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.newBlogTitle,
      author: this.state.newBlogAuthor,
      url: this.state.newBlogUrl,
      likes: this.state.newBlogLikes
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          newBlog: '',
          error: `A new blog '${blogObject.title}' by ${blogObject.author} added`
        })
        setTimeout(() => {
          this.setState({ error: null })
        }, 5000);
      })
  }

  updateBlog = (blog) => (event) => {
    try {
      event.preventDefault()
      const blogObject = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1
      }

      blogService
        .update(blog.id, blogObject)
        .then(updatedBlog => {
          const blogs = this.state.blogs.filter(b => b.id !== blog.id)
          this.setState({
            blogs: blogs.concat(updatedBlog)
          })
        })
    } catch (exception) {
      console.log(exception)
    }
  }

  deleteBlog = (blog) => (event) => {
    try {
      if (window.confirm(`Delete ${blog.title}?`)) {
        if (this.state.user.name === blog.user.name) {
          blogService
            .deleteBlog(blog.id)
            .then(result => {
              const blogs = this.state.blogs.filter(b => b.id !== blog.id)
              this.setState({
                blogs: blogs,
                error: `Blog '${blog.title}' has been deleted`
              })
              setTimeout(() => {
                this.setState({ error: null })
              }, 5000);
            })
        } else {
          this.setState({ error: 'You do not have permission to delete this blog' })
        } setTimeout(() => {
          this.setState({ error: null })
        }, 5000);
      }
    } catch (exception) {
      console.log(exception)
    }
  }
  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBloggappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'Wrong username or password'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000);
    }
  }

  logout = async (event) => {
    event.preventDefault()
    try {
      this.setState({ user: null })
      window.localStorage.removeItem('loggedBloggappUser')
      blogService.setToken(null)
    } catch (exception) {
      console.log(exception)
    }
  }

  render() {
    const sortBlogs = (a, b) => b.likes - a.likes

    if (this.state.user === null) {
      return (
        <div>
          <Notification message={this.state.error} />

          <h2>Kirjaudu sovellukseen</h2>

          <form onSubmit={this.login}>
            <div>
              käyttäjätunnus
          <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleLoginFieldChange}
              />
            </div>
            <div>
              salasana
          <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleLoginFieldChange}
              />
            </div>
            <button type="submit">kirjaudu</button>
          </form>
        </div>
      )
    }

    return (

      <div>
        <h2>Blogs</h2>

        <Notification message={this.state.error} />

        <div>
          <form onSubmit={this.logout}>
            <div>
              {this.state.user.name} logged in
           <button type="submit">Logout</button>
            </div>
          </form>

          <Togglable buttonLabel="New blog">
            <BlogForm
              onSubmit={this.addBlog}
              handleLoginFieldChange={this.handleLoginFieldChange}
              newBlogTitle={this.state.newBlogTitle}
              newBlogAuthor={this.state.newBlogAuthor}
              newBlogUrl={this.state.newBlogUrl}
              newBlogLikes={this.state.newBlogLikes}
            />
          </Togglable>

          <div>
            <br></br>
            {this.state.blogs.sort(sortBlogs).map(blog =>
              <Togglable otsikko={blog.title}>
                <Blog
                  key={blog._id}
                  blog={blog}
                  updateBlog={this.updateBlog(blog)}
                  deleteBlog={this.deleteBlog(blog)}
                  deleteButtonVisible={this.state.user.name === blog.user.name} />
              </Togglable>
            )}
          </div>

        </div>
      </div>

    )
  }
}

export default App;
