/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
const { removeEmpty, toArray, isUrlArray } = require('../utilities/utilities')

module.exports = {
  Criteria: (query, criterion, reduce = true) => ({
    filter: criterion(query, reduce),
    page: query.page || 1,
    limit: query.limit || 12,
    sort: query || 'asc'
  }),
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
