const Joi = require('@hapi/joi')

const schemas = {

  userRegister: Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .required()
      .min(3)
      .max(30),

    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),

    first_name: Joi.string()
      .alphanum()
      .required()
      .min(2)
      .max(30),

    last_name: Joi.string()
      .alphanum()
      .required()
      .min(2)
      .max(30),

    repeat_password: Joi.ref('password')
  }),

  userLogin: Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .required()
      .min(3)
      .max(30),

    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required()
  }),

  blogPost: Joi.object().keys({
    author: Joi.string()
      .required()
      .min(3)
      .max(30),
    title: Joi.string()
      .required()
      .min(5)
      .max(50),
    content: Joi.string()
      .required()
      .min(10)
      .max(15000),
    imageURL: Joi.string()
      .required()
      .min(5)
      .max(50)
  }),

  tag: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(3)
      .max(15)
  })


}
module.exports = schemas
