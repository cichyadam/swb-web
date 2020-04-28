const decamelizeKeys = require('decamelize-keys')

module.exports = {
  decamelize (object) {
    return decamelizeKeys(object, '_')
  },
  isEmpty (object) {
    for (let key in object) {
        if(object.hasOwnProperty(key))
            return false
    }
    return true
  }
}
