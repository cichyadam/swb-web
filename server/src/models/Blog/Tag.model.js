const mongoose = require('mongoose')

const { Schema } = mongoose

const TagSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true }
  }
})

const Tag = mongoose.model('Tag', TagSchema)

module.exports = Tag
