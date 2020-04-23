const decamelizeKeys = require('decamelize-keys')

module.exports = {
  decamelize (object) {
    return decamelizeKeys(object, '_')
  }
}
