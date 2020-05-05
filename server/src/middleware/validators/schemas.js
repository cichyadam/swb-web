const Joi = require('@hapi/joi')

const schemas = {

  userCreate: Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .required()
      .min(3)
      .max(30),

    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),

    firstName: Joi.string()
      .alphanum()
      .required()
      .min(2)
      .max(30),

    lastName: Joi.string()
      .alphanum()
      .required()
      .min(2)
      .max(30),

    role: Joi.string()
      .alphanum()
      .required()
      .min(20)
      .max(255)

    // repeatPassword: Joi.ref('password')
  }),

  userUpdate: Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30),

    password: Joi.string()
      .alphanum()
      .required()
      .min(3)
      .max(30),

    firstName: Joi.string()
      .alphanum()
      .min(2)
      .max(30),

    lastName: Joi.string()
      .alphanum()
      .min(2)
      .max(30)

    // repeatPassword: Joi.ref('password')
  }),

  userLogin: Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .required()
      .min(3)
      .max(30),

    password: Joi.string()
      .alphanum()
      .required()
      .min(3)
      .max(30)
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
    imageUrl: Joi.string()
      .required()
      .min(5)
      .max(50)
  }),

  tag: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(3)
      .max(15)
  }),

  collection: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(3)
      .max(32)
  }),

  images: Joi.array()
    .items(Joi.object().keys({
      title: Joi.string()
        .required()
        .min(3)
        .max(32),
      url: Joi.string()
        .required()
        .min(3)
        .max(64)
    }))

}
module.exports = schemas
