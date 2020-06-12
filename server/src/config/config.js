const path = require('path')

const dirs = {
  root: path.join(__dirname, '/../../'),
  src: path.join(__dirname, '/../'),
  public: path.join(__dirname, '/../public/'),
  images: path.join(__dirname, '/../public/images')
}

const imageHandler = {
  sizes: [{
    path: `${dirs.images}/full/`,
    width: null,
    options: {
      quality: 100
    }
  }, {
    path: `${dirs.images}/medium/`,
    width: 840,
    options: {
      quality: 80
    }
  }, {
    path: `${dirs.images}/small/`,
    width: 300,
    options: {
      quality: 70
    }
  }]
}

module.exports = {
  port: process.env.PORT,
  host: process.env.HOST,
  db: {
    uri: process.env.MONGODB_URI
  },
  authentication: {
    issuer: 'SkateWorldBetterAuth',
    jwtSecret: process.env.JWT_SECRET,
    salt_factor: 10
  },
  roles: {
    super: 'super',
    admin: 'admin',
    cooperator: 'cooperator'
  },
  dirs,
  imageHandler
}
