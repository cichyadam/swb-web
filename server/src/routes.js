const AuthController = require('./controllers/AuthController')
const BlogController = require('./controllers/BlogController')
const TagController = require('./controllers/TagController')
const TestController = require('./controllers/TestController')
const Auth = require('./middleware/policies/Authentication')
const Validate = require('./middleware/validators/requestValidator')
const schemas = require('./middleware/validators/schemas')

module.exports = (app) => {
  app.post('/api/register',
    Validate(schemas.userRegister),
    AuthController.register)
  app.post('/api/login',
    Validate(schemas.userLogin),
    AuthController.login)
  app.get('/api/blog',
    BlogController.getAllBlogPosts)
  app.post('/api/blog/create',
    Auth.authorize,
    Validate(schemas.blogPost),
    BlogController.createBlogPost)
  app.get('/api/blog/:id',
    BlogController.getOneBlogPost)
  app.post('/api/blog/:id/edit',
    Auth.authorize,
    BlogController.editBlogPost)
  app.post('/api/blog/:id/delete',
    Auth.authorize,
    BlogController.deleteBlogPost)
  app.get('/api/tags',
    TagController.getAllTags)
  app.post('/api/tags/create',
    Validate(schemas.tag),
    TagController.createTag)
  app.get('/test',
    Auth.authorize,
    TestController.test)
  app.post('/post-test',
    TestController.list)
  app.get('/get-test',
    TestController.update)
}
