const decamelizeKeys = require('decamelize-keys')
const camelizeKeys = require('camelize')

module.exports = {
  decamelize(object) {
    return decamelizeKeys(object, '_')
  },
  camelize(object) {
    return camelizeKeys(object)
  },
  isEmpty(object) {
    return Object.keys(object).length === 0
  }
}
