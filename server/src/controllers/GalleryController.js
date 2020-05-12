const ImageService = require('../services/ImageService')
const AlbumService = require('../services/AlbumService')
const { handleMongooseError, ErrorHandler } = require('../helpers/errors/error')
const { handleResponse, searchResult } = require('../helpers/resources/response')
const { toArray, isIdValidObjectId } = require('../helpers/utilities/utilities')
const { TAlbum, TImage } = require('../helpers/transforms/transforms')
const { ImageCriterion, AlbumCriterion, Criteria } = require('../helpers/criterions/criterions')
const { sculpt } = require('../helpers/resources/interface')

module.exports = {
  async getImage(req, res, next) {
    const { imageId } = req.params

    try {
      if (!isIdValidObjectId(imageId)) throw new ErrorHandler(403, 'invalid document id passed as a parameter', __filename)

      const image = ImageService.getOne(imageId)

      handleResponse(sculpt(image), res)
    } catch (err) {
      next(err)
    }
  },
  async listImages(req, res, next) {
    const { query } = req

    const criteria = Criteria(query, ImageCriterion)

    try {
      const result = await ImageService.list(criteria)

      searchResult(res, criteria, result, ['title', 'url', 'album.id', 'album.name'])
    } catch (err) {
      next(err)
    }
  },
  async createImages(req, res, next) {
    const tImages = TImage(req.body)

    try {
      // Handle upload code

      const created = await ImageService.create(tImages)

      handleResponse(created, res)
    } catch (err) {
      next(handleMongooseError(err))
    }
  },
  async deleteImages(req, res, next) {
    const { imageIds } = req.query

    try {
      const deleted = await ImageService.delete(toArray(imageIds))

      handleResponse(deleted, res)
    } catch (err) {
      next(handleMongooseError(err))
    }
  },
  async moveImages(req, res, next) {
    const { imageIds, albumId } = req.body

    try {
      if (!isIdValidObjectId(albumId)) throw new ErrorHandler(403, 'invalid document id passed as a parameter', __filename)

      const tImage = TImage({ album: albumId })

      const updated = await ImageService.updateMany(imageIds, tImage)

      handleResponse(sculpt(updated), res)
    } catch (err) {
      next(err)
    }
  },
  async updateImage(req, res, next) {
    const { imageId } = req.params

    try {
      if (!isIdValidObjectId(imageId)) throw new ErrorHandler(403, 'invalid document id passed as a parameter', __filename)

      const tImage = TImage(req.body)

      const updated = ImageService.updateById(tImage)

      handleResponse(sculpt(updated), res)
    } catch (err) {
      next(err)
    }
  },

  async getAlbum(req, res, next) {
    const { albumId } = req.params

    try {
      if (!isIdValidObjectId(albumId)) throw new ErrorHandler(403, 'invalid document id passed as a parameter', __filename)

      const image = AlbumService.getOne(albumId)

      handleResponse(sculpt(image), res)
    } catch (err) {
      next(err)
    }
  },
  async listAlbums(req, res, next) {
    const { query } = req

    const criteria = Criteria(query, AlbumCriterion)

    try {
      const result = await AlbumService.list(criteria)

      searchResult(res, criteria, result, ['name'])
    } catch (err) {
      next(err)
    }
  },
  async createAlbum(req, res, next) {
    const tAlbum = TAlbum(req.body)

    try {
      const inserted = await AlbumService.create(tAlbum)

      handleResponse(sculpt(inserted, ['name', 'createdAt']), res)
    } catch (err) {
      next(handleMongooseError(err))
    }
  },
  async updateAlbum(req, res, next) {
    const { params, body } = req
    try {
      if (!isIdValidObjectId(params.albumId)) throw new ErrorHandler(403, 'invalid document id passed as a parameter', __filename)

      const tAlbum = TAlbum(body)

      const response = await AlbumService.updateById(params.albumId, tAlbum)

      if (!response) throw new ErrorHandler(500, 'Album not found', __filename)

      handleResponse(sculpt(response, ['name', 'updatedAt']), res)
    } catch (err) {
      next(err)
    }
  },
  async deleteAlbums(req, res, next) {
    const { albumIds, isDeepDelete } = req.query

    try {
      const albumDelete = await AlbumService.deleteMany(albumIds)

      if (isDeepDelete) {
        const imageDelete = await ImageService.deleteByAlbums(albumIds)

        handleResponse({
          albumDelete,
          imageDelete
        }, res)
      } else {
        const imageUpdate = await ImageService.updateAlbum(albumIds)

        handleResponse({
          albumDelete,
          imageUpdate
        }, res)
      }
    } catch (err) {
      next(err)
    }
  }
}
