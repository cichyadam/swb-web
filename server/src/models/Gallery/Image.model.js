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
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album'
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

ImageSchema.pre('save', function (next) {
  const image = this
  image.updatedAt = Date.now
  next()
})


const Image = mongoose.model('Image', ImageSchema)

module.exports = Image
