/* eslint-disable no-return-await */
/* eslint-disable consistent-return */
const BlogPost = require('../models/Blog/BlogPost.model')

module.exports = {
  async list() {
    const articles = await BlogPost
      .find()
      .populate('tags')
    return articles
  },
  async getById(id) {
    const article = await BlogPost
      .findById(id)
      .populate('tags')
    return article
  },
  async create(author, title, subtitle, tags, content, imageUrl) {
    let article = new BlogPost({
      author,
      title,
      subtitle,
      tags,
      content,
      imageUrl
    })
    article = await article.save()
    return article
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

    article.updatedAt = Date.now()

    return await article.save()
  },
  async deleteBlogPost(id) {
    const article = await BlogPost.findByIdAndDelete(id)
    return article
  }
}
