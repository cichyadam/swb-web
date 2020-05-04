/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-return-await */
const Promise = require('bluebird')
const User = require('../models/Users/User.model')
const { isZero } = require('../helpers/utilities/utilities')

const searchQuery = async (Model, criteria, populate = '') => {
  const queryObj = {}

  if (criteria.filter) {
    Object.keys(criteria.filter).forEach((key) => {
      if (Array.isArray(criteria.filter[key])) {
        queryObj[key] = { $in: criteria.filter[key] }
      } else queryObj[key] = criteria.filter[key]
    })
  }

  const response = await Promise.all([
    Model.find(queryObj).limit(criteria.limit * 1).skip((criteria.page - 1) * criteria.limit).populate(populate)
      .exec(),
    Model.find(queryObj).countDocuments().exec()
  ]).spread((data, count) => ({ data, count }), (err) => err)

  return response
}

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

  async list(criteria) {
    return await searchQuery(User, criteria, 'role')
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
