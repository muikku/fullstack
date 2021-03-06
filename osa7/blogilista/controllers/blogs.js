const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comments = require('../models/comment')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, _id: 1 })
  response.json(allBlogs.map(Blog.format))
})

blogsRouter.get('/:id', async (request, response) => {
  try{
    const aBlog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })

    aBlog ? response.json(Blog.format(aBlog)) : response.status(404).end()

  } catch (exception) {
    console.log(exception)
    response.status(400).json({ error: 'unknown id' })
  }
})

blogsRouter.get('/all/comments', async (request, response) => {
  try{
    const comments = await Comments.find({}) ///populate if needen

    comments ? response.json(comments.map(Comments.format)) : response.status(404).end()

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
      user: {username: user.username, name: user.name, _id: user._id}
    })

    const savedBlog = await blog.save()
    const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(Blog.format(populatedBlog))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  try{
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if(!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const properties = [body.message, body.blogId]
    if(properties.includes(undefined)) {
      return response.status(400).json({ error: 'content missing' })
    }

   /*  const user = await User.findById(decodedToken.id) */

    const comment = new Comments({
      message: body.message,
      blogId: body.blogId
    })

    const savedComments = await comment.save()
    /* const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 }) */
    /* user.blogs = user.blogs.concat(savedBlog._id) */
    /* await user.save() */

    response.json(Comments.format(savedComments))
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
    const auhtorized = blog.user ? blog.user.toString() === user._id.toString() || blog.user.toString() === 'anonymous' : true
    const deletethisid = blog._id

    if(auhtorized){
      await Blog.findByIdAndRemove(request.params.id)
      const updatedUser = {
        username: user.username,
        name: user.name,
        adult: user.adult,
        passwordHash: user.passwordHash,
        blogs: user.blogs.filter(e => e.toString() !== deletethisid.toString())
      }

      await User.findByIdAndUpdate(user._id, updatedUser, { new: true })
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
    user: { _id: body.user._id, username: body.user.username, name: body.user.name }
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