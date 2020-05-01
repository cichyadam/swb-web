const AuthController = require('./controllers/AuthController')
const BlogController = require('./controllers/BlogController')
const TagController = require('./controllers/TagController')
const TestController = require('./controllers/TestController')
const GalleryController = require('./controllers/GalleryController')
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

  app.get('/api/images',
    GalleryController.listImages)

  app.post('/api/images/create',
    Auth.authorize,
    Validate(schemas.images),
    GalleryController.createImages)

  app.post('/api/images/delete',
    Auth.authorize,
    GalleryController.deleteImages)

  app.get('/api/collections',
    Auth.authorize,
    GalleryController.listCollections)

  app.get('/api/collections/create',
    Auth.authorize,
    GalleryController.createCollection)

  app.get('/api/collections/delete',
    Auth.authorize,
    GalleryController.deleteCollection)

  app.get('/test',
    Auth.authorize,
    TestController.test)

  app.post('/post-test',
    TestController.list)

  app.get('/get-test',
    TestController.update)
}
