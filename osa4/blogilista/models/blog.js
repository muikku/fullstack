const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogSchema = new Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.statics.format = function(Blog) {
  return ({
    title: Blog.title,
    author: Blog.author,
    url: Blog.url,
    likes: Blog.likes,
    id: Blog._id
  })
}


const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog