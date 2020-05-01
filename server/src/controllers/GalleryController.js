const ImageService = require('../services/ImageService')
const CollectionService = require('../services/CollectionService')
const { handleMongooseError } = require('../helpers/errors/error')
const { handleResponse } = require('../helpers/resources/response')
const { toArray } = require('../helpers/utilities')

module.exports = {
  async listImages(req, res, next) {
    const { query, params } = req

    res.json({
      query,
      params
    })

    // if empty -> list all

    // if ids -> find by ids
    // if collectionId -> return populated collection
    // if collectionIds -> filter by collectionids
  },
  async createImages(req, res, next) {
    const { body } = req

    try {
      const created = await ImageService.create(body)

      handleResponse(created, res)
    } catch (err) {
      next(handleMongooseError(err))
    }
  },
  async deleteImages(req, res, next) {
    const { ids } = req.query

    try {
      const deleted = await ImageService.delete(toArray(ids))

      handleResponse(deleted, res)
    } catch (err) {
      next(handleMongooseError(err))
    }
  },
  async listCollections(req, res, next) {
    try {
      const collections = await CollectionService.list()

      handleResponse(collections, res)
    } catch (err) {
      next(handleMongooseError(err))
    }
  },
  async createCollection(req, res, next) {
    const { name } = req.body

    try {
      const inserted = await CollectionService.create({ name })

      handleResponse(inserted, res)
    } catch (err) {
      next(handleMongooseError(err))
    }
  },
  async deleteCollection(req, res, next) {
    const { id } = req.query

    try {
      const deleted = await CollectionService.delete({ id })

      handleResponse(deleted, res)
    } catch (err) {
      next(handleMongooseError(err))
    }
  },
  async handleImageAndCollection(req, res, next) {
    // get
  },
  async filterImagesByCollections(req, res, next) {
    const { collectionIds } = req.query

    try {
      const imageIds = await CollectionService.listImageIds(toArray(collectionIds))
      const images = await ImageService.findByIds(imageIds)

      handleResponse(images, res)
    } catch (err) {
      next(handleMongooseError(err))
    }
  }
}
