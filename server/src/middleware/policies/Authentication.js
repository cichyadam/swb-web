const jwt = require('jsonwebtoken');
const config = require('../../config/config');

module.exports = {
    authorize(req, res, next) {
        const { token } = req.query;

        jwt.verify(token, config.authentication.jwtSecret, (err) => {
            if (err) {
                res.status(403).json({
                    error: 'Token is invalid or expired',
                });
            } else {
                next();
            }
        });
    },
};