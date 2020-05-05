/* eslint-disable consistent-return */
const mongoose = require('mongoose')

const { Schema } = mongoose

const ImageSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: { unique: true },
    lowercase: true
  },
  url: {
    type: String,
    required: true,
    index: { unique: true }
  },
  collections: {
    type: Schema.Types.ObjectId,
    ref: 'Collection'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

const Image = mongoose.model('Image', ImageSchema)

module.exports = Image
