const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({})
  response.json(allBlogs.map(Blog.format))
})

blogsRouter.get('/:id', async (request, response) => {
  try{
    const aBlog = await Blog.findById(request.params.id)

    aBlog ? response.json(Blog.format(aBlog)) : response.status(404).end()

  } catch (exception) {
    console.log(exception)
    response.status(400).json({ error: 'unknown id' })
  }
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
    console.log(exception)
    response.status(500).json({ error: 'something went wrong' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try{
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.put('/:id', async (request, response) => {

  const body = request.body

  const properties = [body.author, body.title, body.url]

  if(properties.includes(undefined)) {
    return response.status(400).json({ error: 'content missing' })
  }

  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  }

  try{
    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(201).json(blog)
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

module.exports = blogsRouter