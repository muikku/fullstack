const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map(Blog.format))
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  console.log('blog body', blog)
  blog
    .save()
    .then(result => {
      console.log(result)
      response.status(201).json(Blog.format(result))
    })
})

module.exports = blogsRouter