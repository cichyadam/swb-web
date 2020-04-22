const config = require('../config/config')
const User = require('../models/Users/User.model')
const RoleService = require('../services/RoleService')
const UserService = require('../services/UserService')
const PermissionService = require('../services/PermissionService')

module.exports = {
  async test(req, res) {
    res.send('Hello from Node.js app \n')
  },
  async list(req, res) {
    const role = await RoleService.create({ name: 'test_role' })
    const permission = await PermissionService.create({ name: 'EDIT_CONTENT' })

    await RoleService.addPermission(role.id, permission.id)
    const updatedRole = await RoleService.getOneById(role.id)

    res.json(updatedRole)
  },
  async update(req, res) {
    await UserService.updateById('5ea1b7d84054c7992da8e11c', { username: 'latest' })

    const test = await UserService.getById('5ea1b7d84054c7992da8e11c')

    res.json(test)
  }
}
