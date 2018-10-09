const dummy = (blogs) => {
  blogs
  return 1
}

const totalLikes = (Blogs) => {
  return Blogs.map(e => e.likes).reduce((acc, cur) => acc + cur)
}

module.exports = {
  dummy,
  totalLikes
}