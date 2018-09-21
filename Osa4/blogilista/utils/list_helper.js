const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = (total, blog) => total + blog.likes

  return blogs.reduce(likes, 0)
}

const favoriteBlog = (blogs) => {
  const favorite = (fav, blog) => fav.likes < blog.likes ? blog : fav
  return blogs.reduce(favorite, blogs[0])
}

const mostBlogs = (blogs) => {
  const authors = []

  blogs.map(blog => {
    authors[blog.author] = (authors[blog.author] || 0) + 1
  })

  const author = Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b)

  return {author, blogs: authors[author]}
}

const mostLikes = (blogs) => {
  const authors = []

  blogs.map(blog => {
    authors[blog.author] = (authors[blog.author] || 0) + blog.likes
  })

  const author = Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b)

  return {author, likes: authors[author]}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}