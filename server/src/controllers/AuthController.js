const jwt = require('jsonwebtoken');
const config = require('../config/config');

function jwtSignUser(user) {
    return jwt.sign(user, config.authentication.jwtSecret);
}

module.exports = {
    async register(req, res) {
        const { username, password } = req.body;
        if (typeof username !== 'string' || typeof password !== 'string') {
            res.status(500).send({
                error: 'invalid type',
            });
        } else {
            try {
              // mongoose code
            } catch (err) {
                res.status(400).send({
                    error: 'This username is already in use',
                });
            }
        }
    },
    async login(req, res) {
        const { username, password } = req.body;
        if (typeof username !== 'string' || typeof password !== 'string') {
            res.status(403).json({
                error: 'invalid type',
            });
        } else {
            try {
                // mongoose code
                if (!user) {
                    res.status(403).send({
                        error: 'Username not registered in the database', // message should be more generic for security purpouses
                    });
                }

                // eslint-disable-next-line max-len
                // use password compare method from the user object to check login info against hashed password
                const isPasswordValid = await user.comparePassword(password);
                if (!isPasswordValid) {
                    res.status(403).send({
                        error: 'Password incorrect',
                    });
                }

                const userJson = user.toJSON();
                res.send({
                    user: userJson,
                    token: jwtSignUser(userJson),
                });
            } catch (err) {
                res.status(403).send({
                    error: `Error occured trying to log in ${err}`,
                });
            }
        }
    },
};