const mongoose = require('mongoose')

const { Schema } = mongoose

const BlogPostSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  tags: {
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }
})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)

module.exports = BlogPost
