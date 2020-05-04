const { removeEmpty } = require('../utilities/utilities')

module.exports = {
  TUser: (body, reduce = true) => {
    const schema = {
      username: body.username || null,
      password: body.password || null,
      firstName: body.firstName || null,
      lastName: body.lastName || null,
      role: body.role || null
    }

    if (reduce) return removeEmpty(schema)
    return schema
  }
}
