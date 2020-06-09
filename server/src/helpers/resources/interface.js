const { isEmpty } = require('../utilities/utilities')

module.exports = {
  sculpt: function sculpt(model, keysArray = []) {
    if (isEmpty(keysArray)) return model

    if (Array.isArray(model)) {
      const array = model.map((item) => sculpt(item, keysArray))

      return array
    }

    const schema = {}

    schema.id = model.id

    keysArray.forEach((key) => {
      if (key.split('.')[1]) {
        if (!schema[key.split('.')[0]]) schema[key.split('.')[0]] = {}
        schema[key.split('.')[0]][key.split('.')[1]] = model[key.split('.')[0]][key.split('.')[1]]
      } else {
        schema[key] = model[key]
      }
    })

    return schema
  }
}
