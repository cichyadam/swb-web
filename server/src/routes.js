const AuthController = require('./controllers/AuthController');
const RecipeController = require('./controllers/RecipeController');
const Auth = require('./middleware/policies/Authentication');

module.exports = (app) => {
    app.post('/register',
        AuthController.register,
    );
    app.post('/login',
        AuthController.login,
    );
    app.post('/test',
        Auth.authorize,
        // Controller
    );
};