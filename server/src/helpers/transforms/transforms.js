/* eslint-disable no-nested-ternary */
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

  TImage: function TImage(body, reduce = true) {
    if (Array.isArray(body)) {
      const array = body.map((image) => TImage(image, reduce))

      return array
    }

    const schema = {
      title: body.title || null,
      url: body.url || null,
      album: body.album || null
    }

    if (reduce) return removeEmpty(schema)
    return schema
  },

  TTag: function TTag(body, reduce = true) {
    if (Array.isArray(body)) {
      const array = body.map((image) => TTag(image, reduce))

      return array
    }

    const schema = {
      name: body.name || null
    }

    if (reduce) return removeEmpty(schema)
    return schema
  },

  TBlogPost: (body, reduce = true) => {
    const schema = {
      author: body.author || null,
      title: body.title || null,
      subtitle: body.subtitle || null,
      content: body.content || null,
      thumbnail: body.thumbnail ? body.thumbnail : body.images && body.images.length !== 0 ? body.images[0] : null,
      images: body.images || null,
      isPublished: body.isPublished || null,
      tags: body.tags || null
    }

    if (reduce) return removeEmpty(schema)
    return schema
  }
}
