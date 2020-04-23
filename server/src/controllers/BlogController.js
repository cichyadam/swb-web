const { ErrorHandler } = require('../helpers/errors/error')
const BlogPostService = require('../services/BlogPostService')

const POST_NOT_FOUND = 'Blog post has not been found'
const POST_NOT_CREATED = 'There has been a trouble with creating a blog post'
const POST_CREATED = 'Blog post was successfully published'
const POST_EDITED = 'Blog post was successfully edited'
const POST_DELETED = 'Blog post was successfully deleted'

module.exports = {
  async getAllBlogPosts(req, res, next) {
    const articles = await BlogPostService.getAllBlogPosts()

    if (articles.length === 0) {
      try {
        throw new ErrorHandler(404, POST_NOT_FOUND, __filename)
      } catch (err) {
        next(err)
      }
    } else {
      res.send(articles)
    }
  },
  async getOneBlogPost(req, res, next) {
    const { id } = req.params
    const article = await BlogPostService.getOneBlogPost(id)
    if (!article) {
      try {
        throw new ErrorHandler(404, POST_NOT_FOUND, __filename)
      } catch (err) {
        next(err)
      }
    } else {
      res.send(article)
    }
  },
  async createBlogPost(req, res, next) {
    const {
      author, title, content, imageURL
    } = req.body
    const article = await BlogPostService.createBlogPost(author, title, content, imageURL)
    if (!article) {
      try {
        throw new ErrorHandler(422, POST_NOT_CREATED, __filename)
      } catch (err) {
        next(err)
      }
    } else {
      try {
        res.status(200).json({
          message: POST_CREATED,
          post: article
        })
      } catch (err) {
        next(err)
      }
      res.send(article)
    }
  },
  async deleteBlogPost(req, res, next) {
    const { id } = req.params
    const article = await BlogPostService.deleteBlogPost(id)

    if (!article) {
      try {
        throw new ErrorHandler(404, POST_NOT_FOUND, __filename)
      } catch (err) {
        next(err)
      }
    } else {
      try {
        res.status(200).json({
          message: POST_DELETED,
          post: article
        })
      } catch (err) {
        next(err)
      }
    }
  },
  async editBlogPost(req, res, next) {
    const { id } = req.params
    const {
      author, title, content, imageURL
    } = req.body
    const article = await BlogPostService.editBlogPost(id, author, title, content, imageURL)

    if (!article) {
      try {
        throw new ErrorHandler(404, POST_NOT_FOUND, __filename)
      } catch (err) {
        next(err)
      }
    } else {
      try {
        res.status(200).json({
          message: POST_EDITED,
          post: article
        })
      } catch (err) {
        next(err)
      }
    }
  }

}
