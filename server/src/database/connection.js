const mongoose = require('mongoose')
const config = require('../config/config')

const connection = config.db.uri

const connectDb = () => mongoose.connect(connection,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

module.exports = connectDb
