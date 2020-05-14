/* eslint-disable no-plusplus */
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
const sharp = require('sharp')
const Promise = require('bluebird')
const { v4: uuidv4 } = require('uuid')
const { dirs, imageHandler: imagesConfig } = require('../config/config')
const UserService = require('../services/UserService')
const ImageService = require('../services/ImageService')
const { TImage } = require('../helpers/transforms/transforms')
const { ImageCriterion, UserCriterion, Criteria } = require('../helpers/criterions/criterions')
const { handleResponse, searchResult } = require('../helpers/resources/response')
const { ErrorHandler, handleMongooseError } = require('../helpers/errors/error')
const { sculpt } = require('../helpers/resources/interface')
const { toArray, isIdValidObjectId } = require('../helpers/utilities/utilities')
const { deleteFiles } = require('../features/FsHandler')

module.exports = {
  async test(req, res, next) {
    res.json(req.body)
  },
  async testTwo(req, res, next) {
    const { id } = req.params

    try {
      const isIdValid = isIdValidObjectId(id)

      if (!isIdValid) throw new ErrorHandler(403, 'Invalid id passed in params', __filename)

      handleResponse({ message: 'OK' }, res)
    } catch (err) {
      next(err)
    }
  },
  async update(req, res) {
    const { token } = req.query
    const { role } = req.body

    const decoded = jwt.decode(token)

    if (!role) res.status(403).send('Missing role')

    await UserService.assignRole(decoded.sub, role)

    const test = await UserService.getById(decoded.sub)

    res.json(test)
  },
  async index(req, res) {
    res.render('index')
  },
  async upload(req, res, next) {
    try {
      Promise.map(req.files, async (file, i) => {
        const imageName = `${uuidv4()}.png`
        const fileObject = {
          url: imageName,
          title: req.body.title[i]
        }

        await Promise.map(imagesConfig.sizes, (size) => sharp(file.buffer)
          .resize(size.width)
          .png(size.options)
          .toFile(size.path + imageName))
        return fileObject
      })
        .then(async (data) => {
          const tImage = TImage(data)

          const inserted = await ImageService.create(tImage)

          handleResponse(sculpt(inserted), res)
        })
    } catch (err) {
      next(err)
    }
  },
  async delete(req, res, next) {
    const { query } = req

    try {
      const criteria = Criteria(query, ImageCriterion)

      const imagesToDelete = await ImageService.list(criteria)

      if (imagesToDelete.count === 0) throw new ErrorHandler(401, 'No images found', __filename)

      const urlsToDelete = imagesToDelete.data.map((image) => image.url)
      const paths = [`${dirs.images}/full/`, `${dirs.images}/medium/`, `${dirs.images}/small/`]
      const filesToDelete = urlsToDelete.map((url) => paths.map((filePath) => filePath + url)).flat()

      deleteFiles(filesToDelete, async (err) => {
        if (err) {
          throw ErrorHandler(403, err, __filename)
        } else {
          const deleted = await ImageService.delete(imagesToDelete.data.map((image) => image.id))

          handleResponse(deleted, res)
        }
      })
    } catch (err) {
      next(err)
    }
  }
}
