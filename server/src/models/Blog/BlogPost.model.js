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
  subtitle: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  imageUrl: {
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

BlogPostSchema.pre('save', function (next) {
  const blogPost = this
  blogPost.updatedAt = Date.now
  next()
})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)

module.exports = BlogPost
