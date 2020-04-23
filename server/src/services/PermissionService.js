/* eslint-disable consistent-return */
/* eslint-disable no-return-await */
const Permission = require('../models/Users/Permission.model')
const { decamelize } = require('../helpers/decamelize')

module.exports = {
  async create(permission) {
    return await Permission.create(decamelize(permission))
  },

  async delete(permission) {
    return await Permission.deleteOne(decamelize(permission))
  },

  async updateByName(oldName, newName) {
    const permission = await Permission.findOne({ name: oldName })

    if (!permission) return

    permission.name = newName

    return await permission.save()
  },

  async updateById(id, newName) {
    const permission = await Permission.findById(id)

    if (!permission) return

    permission.name = newName

    return await permission.save()
  },

  async list() {
    return await Permission.find()
  },

  async getOneByName(name) {
    return await Permission.findOne({ name })
  },

  async getOneById(id) {
    return await Permission.findById(id)
  }
}
