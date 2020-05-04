module.exports = {
  port: process.env.PORT,
  host: process.env.HOST,
  db: {
    uri: `mongodb://${process.env.HOST}:27017/${process.env.DB_NAME}`
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
  }
}
