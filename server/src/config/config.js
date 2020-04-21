module.exports = {
    port: process.env.PORT || 8080,
    host: process.env.HOST || '0.0.0.0',
    db: {
        uri: 'mongodb://mongo:27017/' + process.env.DB_NAME
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret',
    },
};