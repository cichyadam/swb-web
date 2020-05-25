const UserController = require('./controllers/UserController')
const BlogController = require('./controllers/BlogController')
const TagController = require('./controllers/TagController')
const TestController = require('./controllers/TestController')
const GalleryController = require('./controllers/GalleryController')
const Auth = require('./middleware/policies/Authentication')
const Validate = require('./middleware/validators/requestValidator')
const schemas = require('./middleware/validators/schemas')
const upload = require('./middleware/upload/upload')

module.exports = (app) => {
  // USER CONTROL ENDPOINTS

  app.post('/api/users',
    Validate(schemas.userCreate),
    UserController.register)

  app.post('/api/users/login',
    Validate(schemas.userLogin),
    UserController.login)

  app.get('/api/users',
    Auth.authorize,
    UserController.list)

  app.get('/api/users/:userId',
    Auth.authorize,
    UserController.getOneUser)

  app.put('/api/users/:userId',
    Auth.authorize,
    Validate(schemas.userUpdate),
    UserController.update)

  app.delete('/api/users/:userId',
    Auth.authorize,
    UserController.delete)

  app.get('/api/roles',
    UserController.getRoles)

  app.post('/api/roles',
    UserController.createRole)

  // BLOG CONTROL ENDPOINTS

  app.get('/api/blog',
    BlogController.getAllBlogPosts)

  app.post('/api/blog',
    Auth.authorize,
    Validate(schemas.blogPost),
    BlogController.createBlogPost)

  app.get('/api/blog/:blogPostId',
    BlogController.getOneBlogPost)

  app.put('/api/blog/:blogPostId',
    Auth.authorize,
    BlogController.editBlogPost)

  app.delete('/api/blog/:blogPostId',
    Auth.authorize,
    BlogController.deleteBlogPost)

  app.get('/api/tags',
    TagController.getAllTags)

  app.post('/api/tags',
    Validate(schemas.tag),
    TagController.createTag)

  // GALERY CONTROL ENDPOINTS

  app.get('/images', (req, res) => {
    res.render('index')
  })

  app.get('/api/images',
    GalleryController.listImages)

  app.get('/api/images/:imageId',
    GalleryController.getImage)

  app.put('/api/images/:imageId',
    Auth.authorize,
    Validate(schemas.imageUpdate),
    GalleryController.updateImage)

  app.post('/api/images',
    upload.array('images', 12),
    GalleryController.createImages)

  app.delete('/api/images',
    Auth.authorize,
    GalleryController.deleteImages)

  app.put('api/images',
    Auth.authorize,
    GalleryController.moveImages)

  app.get('/api/albums',
    Auth.authorize,
    GalleryController.listAlbums)

  app.get('/api/albums/:albumId',
    Auth.authorize,
    GalleryController.getAlbum)

  app.get('/api/album/:albumId',
    Auth.authorize,
    GalleryController.listAlbum)

  app.post('/api/albums',
    Auth.authorize,
    Validate(schemas.album),
    GalleryController.createAlbum)

  app.put('/api/albums/:albumId',
    Auth.authorize,
    Validate(schemas.album),
    GalleryController.updateAlbum)

  app.delete('/api/albums',
    Auth.authorize,
    GalleryController.deleteAlbums)

  // TEST CONTROL ENDPOINTS

  app.put('/test',
    TestController.test)

  app.get('/test/:id',
    TestController.testTwo)

  app.get('/get-test',
    TestController.update)
}
