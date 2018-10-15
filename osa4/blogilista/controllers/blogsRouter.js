const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({})
  response.json(allBlogs.map(Blog.format))
})

blogsRouter.post('/', async (request, response) => {
  try{
    const body = request.body

    const properties = [body.author, body.title, body.url]

    if(properties.includes(undefined)) {
      return response.status(400).json({ error: 'content missing' })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined || null ? false : 0
    })

    const savedBlog = await blog.save()
    response.json(Blog.format(savedBlog))
  } catch (exception) {
    response.status(500).json({ error: 'something went wrong' })
  }
})

module.exports = blogsRouter