const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  permissions : [{
    type: Schema.Types.ObjectId,
    ref: 'Permission'
  }]
})

const Role = mongoose.model('Role', RoleSchema)

module.exports = Role
