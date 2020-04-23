const BlogPost = require('../models/BlogPosts/BlogPost.model')

module.exports = {
  async getAllBlogPosts() {
    const articles = await BlogPost.find()
    return articles
  },
  async getOneBlogPost(id) {
    const article = await BlogPost.findById(id)
    return article
  },
  async createBlogPost(author, title, content, imageURL) {
    let article = new BlogPost({
      author,
      title,
      content,
      imageURL
    })
    article = await article.save()
    return article
  },
  async editBlogPost(id, author, title, content, imageURL) {
    const article = await BlogPost.findByIdAndUpdate(id, {
      author,
      title,
      content,
      imageURL,
      updated: Date.now()
    }, {
      new: true
    })
    return article
  },
  async deleteBlogPost(id) {
    const article = await BlogPost.findByIdAndDelete(id)
    return article
  }
}
