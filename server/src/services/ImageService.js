/* eslint-disable consistent-return */
/* eslint-disable no-return-await */
const Image = require('../models/Gallery/Image.model')

module.exports = {
  async list() {
    return await Image.find()
  },
  async create(images) {
    return await Image.create(images)
  },
  async delete(ids) {
    return await Image.deleteMany({ _id: { $in: ids } })
  },
  async findByIds(ids) {
    return await Image.find({ _id: { $in: ids } })
  },
  async findByCollections(ids) {
    return await Image.find({ collection: { $in: ids } })
  },
  async addToCollection(imageIds, collectionId) {}
}
