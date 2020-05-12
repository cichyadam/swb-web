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
  },

  TAlbum: (body, reduce = true) => {
    const schema = {
      name: body.name || null
    }

    if (reduce) return removeEmpty(schema)
    return schema
  },

  TImage: (body, reduce = true) => {
    if (Array.isArray(body)) {
      const array = body.map((image) => this.TImage(image, reduce))

      return array
    }

    const schema = {
      title: body.title || null,
      url: body.url || null,
      album: body.album || null
    }

    if (reduce) return removeEmpty(schema)
    return schema
  }
}
