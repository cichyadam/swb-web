const UserController = require('./controllers/UserController')
const BlogController = require('./controllers/BlogController')
const TagController = require('./controllers/TagController')
const TestController = require('./controllers/TestController')
const GalleryController = require('./controllers/GalleryController')
const Auth = require('./middleware/policies/Authentication')
const Validate = require('./middleware/validators/requestValidator')
const schemas = require('./middleware/validators/schemas')

module.exports = (app) => {
  app.post('/api/users/create',
    Validate(schemas.userCreate),
    UserController.register)

  app.post('/api/users/login',
    Validate(schemas.userLogin),
    UserController.login)

  app.get('/api/users',
    Auth.authorize,
    UserController.list)

  app.get('/api/users/:id',
    Auth.authorize,
    UserController.get)

  app.post('/api/users/:id/update',
    Auth.authorize,
    Validate(schemas.userUpdate),
    UserController.update)

  // app.get('/api/roles')
  app.post('/api/roles/create',
    UserController.createRole)

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

  app.get('/test/:id',
    TestController.test)

  app.get('/get-test',
    TestController.update)
}
