const multer = require('multer')

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb('Please upload only images.', false)
  }
}

const upload = multer({
  limits: {
    fileSize: 12 * 1024 * 1024
  },
  fileFilter: multerFilter
})

module.exports = upload
