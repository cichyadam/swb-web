/* eslint-disable consistent-return */
/* eslint-disable no-return-await */
const Role = require('../models/Users/Role.model')

module.exports = {
  async create(role) {
    return await Role.create(role)
  },

  async delete(role) {
    return await Role.deleteOne(role)
  },

  async updateByName(oldName, newName) {
    const role = await Role.findOne({ name: oldName })

    if (!role) return

    role.name = newName

    return await role.save()
  },

  async updateById(id, newName) {
    const role = await Role.findById(id)

    if (!role) return

    role.name = newName

    return await role.save()
  },

  async list() {
    return await Role.find()
      .populate('permissions')
  },

  async getOneByName(name) {
    return await Role.findOne({ name })
      .populate('permissions')
  },

  async getOneById(id) {
    return await Role.findById(id)
      .populate('permissions')
  },

  async addPermission(roleId, permissionId) {
    const role = await Role.findById(roleId)

    if (!role) return

    role.permissions.push(permissionId)

    return await role.save()
  },

  async removePermission(roleId, permissionId) {
    const role = await Role.findById(roleId)

    if (!role) return

    role.permissions.pull(permissionId)

    return await role.save()
  }
}
