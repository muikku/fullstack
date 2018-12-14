const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const userRouter = require('./controllers/user')
const config = require('./utils/config')
const loginRouter = require('./controllers/login')

const extractToken = (request, response, next) => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer')){
    request.token = (authorization.substring(7))
  } else {
    request.token = null
  }
  next()
}

app.use(extractToken)
app.use(cors())
app.use(bodyParser.json())

mongoose.connect(config.mongoUrl, { useNewUrlParser: true })
mongoose.Promise = global.Promise

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/user', userRouter)


app.use(express.static('build'))
app.use(middleware.logger)


app.use(middleware.logger)
app.use(middleware.error)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}