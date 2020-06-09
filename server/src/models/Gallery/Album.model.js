/* eslint-disable consistent-return */
const mongoose = require('mongoose')

const { Schema } = mongoose

const AlbumSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true },
    lowercase: true
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

AlbumSchema.pre('save', function (next) {
  const col = this
  col.updatedAt = Date.now
  next()
})

const Album = mongoose.model('Album', AlbumSchema)

module.exports = Album
