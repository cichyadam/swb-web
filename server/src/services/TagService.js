const Tag = require('../models/Tags/Tag.model')

module.exports = {
  async getAllTags() {
    const tags = await Tag.find()
    return tags
  },
  async getTagByName(name) {
    const tag = await Tag.findOne({
      name
    })
    return tag
  }
}
