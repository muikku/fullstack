const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

blogSchema.statics.format = function(blog) {
  return ({
    _id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: blog.user
  })
}


const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog