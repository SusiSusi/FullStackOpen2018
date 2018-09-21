const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = (total, blog) => total + blog.likes
  
  return blogs.reduce(likes,0)
}

module.exports = {
  dummy,
  totalLikes
}