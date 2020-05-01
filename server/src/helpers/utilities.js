const decamelizeKeys = require('decamelize-keys')
const camelizeKeys = require('camelize')

module.exports = {
  decamelize(object) {
    return decamelizeKeys(object, '_')
  },
  camelize(object) {
    if (Array.isArray(object)) {
      return object.map((item) => camelizeKeys(item))
    }
    return camelizeKeys(object)
  },
  isEmpty(object) {
    return Object.keys(object).length === 0
  },
  toArray(string) {
    return string.split(',')
  }
}
