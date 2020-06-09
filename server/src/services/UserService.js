/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-return-await */
const User = require('../models/Users/User.model')
const { searchQuery } = require('../helpers/criterions/criterions')

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

  async delete(userId) {
    return await User.deleteOne({ _id: userId })
  },

  async search(criteria) {
    return await searchQuery(User, criteria, 'role')
  },

  async list(role) {
    const users = await User.find()
      .populate('role')

    if (role === 'superadmin') {
      return users
    }

    return users.filter((user) => user.role.name !== 'superadmin')
  },

  async updateById(id, newData) {
    const user = await User.findById(id)

    if (!user) return

    // eslint-disable-next-line array-callback-return
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
