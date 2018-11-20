const userRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

userRouter.get('/', async (request, response) => {
  console.log('request body', request.body, 'request token', request.token)
  try{
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if(!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const theuser = await User.findById(decodedToken.id)
    const blog = await Blog.find(
      {
        user: { $in: [ undefined, null,  theuser._id ] }
      }
    ).populate('user', { username: 1, name: 1 })

    response.json(blog.map(Blog.format))

  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

module.exports = userRouter