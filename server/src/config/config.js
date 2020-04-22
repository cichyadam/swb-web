module.exports = {
  port: process.env.PORT,
  host: process.env.HOST,
  db: {
    uri: `mongodb://${process.env.HOST}:27017/${process.env.DB_NAME}`,
  },
  authentication: {
    issuer: process.env.ISSUER,
    jwtSecret: process.env.JWT_SECRET,
    salt_factor: process.env.SALT_FACTOR,
  },
}
