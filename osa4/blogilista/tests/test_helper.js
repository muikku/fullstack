const Blog = require('../models/blog')

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(Blog.format)
}

module.exports = {
  nonExistingId, blogsInDb
}