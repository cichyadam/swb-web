/* eslint-disable consistent-return */
/* eslint-disable no-return-await */
const Album = require('../models/Gallery/Album.model')
const { searchQuery } = require('../helpers/criterions/criterions')

module.exports = {
  async getOne(id) {
    return await Album.findById(id)
  },
  async list(criteria) {
    return await searchQuery(Album, criteria)
  },
  async create(album) {
    return await Album.create(album)
  },
  async deleteOne(albumId) {
    return await Album.deleteOne({ _id: albumId })
  },
  async deleteMany(albumIds) {
    return await Album.deleteMany({ _id: { $in: albumIds } })
  },
  async updateById(id, newData) {
    const album = await Album.findById(id)

    if (!album) return

    // eslint-disable-next-line array-callback-return
    Object.keys(newData).map((key) => {
      if (key !== 'id' && key !== '_id') {
        album[key] = newData[key]
      }
    })

    return await album.save()
  }
}
