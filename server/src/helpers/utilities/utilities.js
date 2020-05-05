/* eslint-disable radix */

module.exports = {
  isEmpty: (obj) => (Array.isArray(obj) ? obj.length === 0 : Object.keys(obj).length === 0),

  isZero: (value) => (typeof value === 'string' ? parseInt(value) === 0 : value === 0),

  toArray: (string) => string.split(',').filter((el) => el),

  isUrlArray: (string) => string.includes(','),

  removeEmpty: function removeEmpty(obj) {
    const newObj = {}

    Object.keys(obj).forEach((key) => {
      if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        newObj[key] = removeEmpty(obj[key])
      } else if (obj[key] != null) {
        newObj[key] = obj[key]
      }
    })

    return newObj
  }
}
