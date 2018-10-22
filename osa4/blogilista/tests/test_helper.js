const Blog = require('../models/blog')
const User = require('../models/user')

const usersInDb = async () => {
  const users = await User.find({}).populate('blogs', { likes: 1, author: 1, title: 1, url: 1 })
  return users
}


const nonExistingId = async () => {
  const blog = new Blog({
    author: 'non',
    title: 'non',
    url: 'non',
  })
  await blog.save()
  await blog.remove()
  return blog._id.toString()
}

const userId0 = async () => {
  const users = await User.find({})
  const userIdZero = users.map(e => e._id)
  return userIdZero[0]
}

const blogsInDb = async () => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  return blogs.map(Blog.format)
}

module.exports = {
  nonExistingId, blogsInDb, usersInDb, userId0
}