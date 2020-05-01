/* eslint-disable consistent-return */
/* eslint-disable no-return-await */
const Collection = require('../models/Gallery/Collection.model')

module.exports = {
  async list() {
    return await Collection.find()
  },
  async create(collection) {
    return await Collection.create(collection)
  },
  async delete(collection) {
    return await Collection.deleteOne(collection)
  },
  async addImages(collectionId, imageIds) {
    const collection = await Collection.findById(collectionId)

    if (!collection) return

    imageIds.map((id) => collection.images.push(id))

    return await collection.save()
  },
  async removeImages(collectionId, imageIds) {
    const collection = await Collection.findById(collectionId)

    if (!collection) return

    imageIds.map((id) => collection.images.pull(id))

    return await collection.save()
  },
  async listImageIds(collectionIds) {
    const collections = await Collection.find({ _id: { $in: collectionIds } })

    if (!collections || collections.length === 0) return []

    const imagesIds = []

    collections.map((collection) => imagesIds.concat(collection.images))

    return [...new Set(imagesIds)]
  }
}
