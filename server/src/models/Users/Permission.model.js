const mongoose = require('mongoose')

const { Schema } = mongoose

const PermissionSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  }
})

const Permission = mongoose.model('Permission', PermissionSchema)

module.exports = Permission
