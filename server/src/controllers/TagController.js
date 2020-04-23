const TagService = require('../services/TagService')
const { ErrorHandler } = require('../helpers/errors/error')

const TAG_EXISTS_ERROR = 'This tag already exists'
const TAG_NOT_SAVED = 'There has been a problem with saving a tag'
const TAG_NOT_FOUND = 'Tag not found'

module.exports = {
  async getAllTags(req, res, next) {
    const tags = await TagService.getAllTags()

    if (tags.length === 0) {
      try {
        throw new ErrorHandler(404, TAG_NOT_FOUND, __filename)
      } catch (err) {
        next(err)
      }
    } else {
      res.send(tags)
    }
  },
  async createTag(req, res, next) {
    const { name } = req.body
    const tag = await TagService.getTagByName(name)

    if (tag) {
      try {
        throw new ErrorHandler(403, TAG_EXISTS_ERROR, __filename)
      } catch (err) {
        next(err)
      }
    } else {
      try {
        const newTag = await TagService.createTag(name)

        if (!newTag) throw new ErrorHandler(403, TAG_NOT_SAVED, __filename)

        res.status(200).json({
          newTag
        })
      } catch (err) {
        next(err)
      }
    }
  }
}
