/* eslint-disable consistent-return */
const mongoose = require('mongoose')

const { Schema } = mongoose

const CollectionSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true },
    lowercase: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

const Collection = mongoose.model('Collection', CollectionSchema)

module.exports = Collection
