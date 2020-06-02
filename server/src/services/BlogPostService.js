/* eslint-disable no-return-await */
/* eslint-disable consistent-return */
const BlogPost = require('../models/Blog/BlogPost.model')
const { searchQuery } = require('../helpers/criterions/criterions')

module.exports = {
  async list(criteria) {
    return await searchQuery(BlogPost, criteria, 'images tags')
  },
  async getById(id) {
    const article = await BlogPost
      .findById(id)
      .populate('tags')
    return article
  },
  async create(blogPost) {
    const newPost = new BlogPost(blogPost)

    return await newPost.save()
  },
  async updateById(id, newData) {
    const article = await BlogPost.findById(id)

    if (!article) return

    // eslint-disable-next-line array-callback-return
    Object.keys(newData).map((key) => {
      if (key !== 'id' && key !== '_id') {
        article[key] = newData[key]
      }
    })
    return await article.save()
  },
  async deleteBlogPost(id) {
    const article = await BlogPost.findByIdAndDelete(id)
    return article
  }
}
