// connection.js
const mongoose = require("mongoose")
const User = require("../models/Users/User.model")
const config = require('./../config/config')

const connection = config.db.uri

const connectDb = () => {
  return mongoose.connect(connection,
    { useNewUrlParser: true,
      useUnifiedTopology: true })
}

module.exports = connectDb
