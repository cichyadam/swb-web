const User = require('../models/Users/User.model')

module.exports = {
    async getByUsername(username) {
      return await User.findOne({ username })
    },
};