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
  published: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)

module.exports = BlogPost
