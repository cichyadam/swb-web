const User = require('../models/Users/User.model')

module.exports = {
  async getByUsername(username) {
    return await User.findOne({ username })
      .populate('role')
  },

  async getById(id) {
    return await User.findById(id)
      .populate('role')
  },

  async create(user) {
    const NewUser = new User(user)

    return await NewUser.save()
  },

  async delete(user) {
    return await User.deleteOne(user)
  },

  async list() {
    return await User.find()
      .populate('role')
  },

  async updateById(id, newData) {
    const user = await User.findById(id)

    if (!user) return

    Object.keys(newData).map((key) => {
      if (key !== 'id' && key !== '_id') {
        user[key] = newData[key]
      }
    })

    return await user.save()
  },

  async assignRole(userId, roleId) {
    const user = await User.findById(userId)

    if (!user) return

    user.role = roleId

    return await user.save()
  },

  async removeRole(userId) {
    const user = await User.findById(userId)

    if (!user) return

    user.role = null

    return await user.save()
  }
}
