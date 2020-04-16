require('dotenv').config();

module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'reciper',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: './reciper.sqlite',
        },
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret',
    },
};