const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
  message: { type: String, required: true },
  blogId: { type: String, required: true }
})

commentSchema.statics.format = function(comment) {
  return ({
    _id: comment._id,
    message: comment.message,
    blogId: comment.blogId
  })
}


const Comment = mongoose.model('Comments', commentSchema)

module.exports = Comment