const AuthController = require('./controllers/AuthController');
const TestController = require('./controllers/TestController')
const Auth = require('./middleware/policies/Authentication');

module.exports = (app) => {
    app.post('/api/register',
        AuthController.register,
    );
    app.post('/api/login',
        AuthController.login,
    );
    app.get('/api/blog',
        // Controller
    );
    app.post('/api/blog/create',
        Auth.authorize,
        // Controller
    );
    app.get('/api/blog/:id',
        // Controller
    );
    app.post('/api/blog/:id/edit',
        Auth.authorize,
        // Controller
    );
    app.post('/api/blog/:id/delete',
        Auth.authorize,
        // Controller
    );
    app.get('/test',
        TestController.test
    );
    app.get('/users',
        TestController.list
    );
    app.get('/create-user',
        TestController.create
    );
};