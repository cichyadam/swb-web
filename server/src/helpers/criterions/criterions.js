/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
const Promise = require('bluebird')
const { removeEmpty, toArray, isUrlArray } = require('../utilities/utilities')

module.exports = {
  Criteria: (query, criterion, reduce = true) => ({
    filter: criterion(query, reduce),
    page: query.page || 1,
    limit: query.limit || 12,
    sort: query || 'asc'
  }),
  searchQuery: async (Model, criteria, populate = '') => {
    const queryObj = {}

    if (criteria.filter) {
      Object.keys(criteria.filter).forEach((key) => {
        if (Array.isArray(criteria.filter[key])) {
          queryObj[key] = { $in: criteria.filter[key] }
        } else queryObj[key] = criteria.filter[key]
      })
    }

    const response = await Promise.all([
      Model.find(queryObj).limit(criteria.limit * 1).skip((criteria.page - 1) * criteria.limit).populate(populate)
        .exec(),
      Model.find(queryObj).countDocuments().exec()
    ]).spread((data, count) => ({ data, count }), (err) => err)

    return response
  },
  UserCriterion: (query, reduce = true) => {
    const schema = {
      _id: query.ids ? isUrlArray(query.ids) ? toArray(query.ids) : query.ids : null,
      username: query.usernames ? isUrlArray(query.usernames) ? toArray(query.usernames) : query.usernames : null,
      firstName: query.firstNames ? isUrlArray(query.firstNames) ? toArray(query.firstNames) : query.firstNames : null,
      lastName: query.lastNames ? isUrlArray(query.lastNames) ? toArray(query.lastNames) : query.lastNames : null,
      role: query.roles ? isUrlArray(query.roles) ? toArray(query.roles) : query.roles : null
    }

    if (reduce) return removeEmpty(schema)
    return schema
  }
}
