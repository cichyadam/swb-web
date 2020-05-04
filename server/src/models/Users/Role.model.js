const mongoose = require('mongoose')

const { Schema } = mongoose

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  }
})

const Role = mongoose.model('Role', RoleSchema)

module.exports = Role
