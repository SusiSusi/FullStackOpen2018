const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Blog 1",
    author: "Miisa",
    url: "www.xx.aa",
    likes: 5
  },
  {
    title: "Blog 2",
    author: "Irmeli",
    url: "www.xx.aa",
    likes: 10
  }
]

const format = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(format)
}

module.exports = {
  initialBlogs, format, blogsInDb
}