const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = (total, blog) => total + blog.likes
  
  return blogs.reduce(likes,0)
}

const favoriteBlog = (blogs) => {
  const favorite = (fav, blog) => fav.likes < blog.likes ? blog : fav
  return blogs.reduce(favorite, blogs[0])
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}