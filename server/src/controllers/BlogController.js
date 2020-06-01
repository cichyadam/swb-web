const { ErrorHandler } = require('../helpers/errors/error')
const BlogPostService = require('../services/BlogPostService')
const TagService = require('../services/TagService')
const { handleResponse, searchResult } = require('../helpers/resources/response')
const { Criteria, BlogPostCriterion } = require('../helpers/criterions/criterions')
const { TBlogPost } = require('../helpers/transforms/transforms')
const { sculpt } = require('../helpers/resources/interface')
const { isIdValidObjectId } = require('../helpers/utilities/utilities')

const POST_NOT_FOUND = 'Blog post has not been found'
const POST_NOT_CREATED = 'There has been a trouble with creating a blog post'

const TAG_EXISTS_ERROR = 'This tag already exists'
const TAG_NOT_SAVED = 'There has been a problem with saving a tag'
const TAG_NOT_FOUND = 'Tag not found'

module.exports = {
  async listBlogPosts(req, res, next) {
    const { query } = req

    const criteria = Criteria(query, BlogPostCriterion)

    try {
      const articles = await BlogPostService.list(criteria)

      searchResult(res, criteria, articles, ['title', 'subtitle', 'content', 'author', 'isPublished', 'thumbnail', 'createdAt', 'updatedAt', 'images', 'tags'])
    } catch (err) {
      next(err)
    }
  },
  async getBlogPost(req, res, next) {
    const {
      blogPostId
    } = req.params

    try {
      if (!isIdValidObjectId(blogPostId)) throw new ErrorHandler(403, 'invalid document id passed as a parameter', __filename)

      const article = await BlogPostService.getById(blogPostId)

      if (!article) throw new ErrorHandler(404, POST_NOT_FOUND, __filename)

      handleResponse(sculpt(article, ['title', 'subtitle', 'content', 'author', 'isPublished', 'thumbnail', 'createdAt', 'updatedAt', 'images', 'tags']), res)
    } catch (err) {
      next(err)
    }
  },
  async createBlogPost(req, res, next) {
    const tBlogPost = TBlogPost(req.body)

    try {
      const article = await BlogPostService.create(tBlogPost)

      if (!article) throw new ErrorHandler(403, POST_NOT_CREATED, __filename)

      handleResponse(sculpt(article, ['title', 'subtitle', 'content', 'author', 'isPublished', 'thumbnail', 'createdAt', 'updatedAt', 'images', 'tags']), res)
    } catch (err) {
      next(err)
    }
  },
  async deleteBlogPost(req, res, next) {
    const { blogPostId } = req.params

    try {
      if (!isIdValidObjectId(blogPostId)) throw new ErrorHandler(403, 'invalid document id passed as a parameter', __filename)

      const article = await BlogPostService.deleteBlogPost(blogPostId)

      if (!article) throw new ErrorHandler(403, POST_NOT_FOUND, __filename)

      handleResponse({ article }, res)
    } catch (err) {
      next(err)
    }
  },
  async editBlogPost(req, res, next) {
    const {
      blogPostId
    } = req.params
    const newData = TBlogPost(req.body)

    try {
      if (!isIdValidObjectId(blogPostId)) throw new ErrorHandler(403, 'invalid document id passed as a parameter', __filename)

      const article = await BlogPostService.updateById(blogPostId, newData)

      if (!article) throw new ErrorHandler(403, POST_NOT_FOUND, __filename)

      handleResponse({ article }, res)
    } catch (err) {
      next(err)
    }
  },

  async getAllTags(req, res, next) {
    try {
      const tags = await TagService.getAllTags()

      if (!tags) throw new ErrorHandler(404, TAG_NOT_FOUND, __filename)

      handleResponse(sculpt(tags), res)
    } catch (err) {
      next(err)
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

        handleResponse(sculpt(newTag), res)
      } catch (err) {
        next(err)
      }
    }
  }

}
