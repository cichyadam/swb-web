/* eslint-disable radix */
const { sculpt } = require('./interface')

const handleResponse = (data, res) => {
  res.status(200).json({
    code: 200,
    data
  })
}

const searchResult = (res, criteria, result, keysArray) => {
  const obj = {
    criteria: criteria.filter,
    total: result.count,
    limit: parseInt(criteria.limit),
    page: parseInt(criteria.page),
    data: sculpt(result.data, keysArray)
  }

  res.status(200).json({ code: 200, ...obj })
}

module.exports = {
  handleResponse,
  searchResult
}
