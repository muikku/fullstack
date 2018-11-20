const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (req, res) => {
  try{
    const body = req.body

    const existingUser = await User.find({ username: body.username })
    if(existingUser.length > 0 ) {
      return res.status(400).json({ error: 'username must be unique' })
    }

    if(body.password.length < 3) {
      return res.status(400).json({ error: 'password must be at least 3 characters long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult === undefined ? true : body.adult,
      passwordHash,
      blogs: body.blogs
    })

    const savedUser = await user.save()

    res.json(savedUser)
  } catch (exception) {
    console.log(exception)
    res.status(500).json({ error: 'something went wrong...' })
  }
})

userRouter.get('/', async (req, res) => {
  const allusers = await User
    .find({})
    .populate('blogs', { likes: 1, author: 1, title: 1, url: 1 })
  res.json(allusers.map(User.format))
})

module.exports = userRouter