module.exports = {
    port: process.env.PORT || 8080,
    host: process.env.HOST || '0.0.0.0',
    db: {
        uri: 'mongodb://localhost:27017/swb'
    },
    authentication: {
        issuer: 'SkateWorldBetterAuth',
        jwtSecret: process.env.JWT_SECRET || 'sguJ5wezitn5n7wBcPMqACa12ZBbKAEEhqT2dQ3Vnl3Qf1BXysXGsEGvNBhmOeC',
        salt_factor: 10,
    },
}
