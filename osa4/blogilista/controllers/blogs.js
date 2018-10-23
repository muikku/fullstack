const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
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
  const body = request.body
  try{
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if(!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const properties = [body.author, body.title, body.url]
    if(properties.includes(undefined)) {
      return response.status(400).json({ error: 'content missing' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: typeof body.likes !== 'number' ? 0 : body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(Blog.format(savedBlog))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try{
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if(!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)
    const auhtorized = blog.user.toString() === user._id.toString()

    if(auhtorized){
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else if(!auhtorized){
      response.status(403).send({ error: 'unauthorized' })
    }
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
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
    likes: typeof body.likes !== 'number' ? 0 : body.likes,
    user: body.user
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