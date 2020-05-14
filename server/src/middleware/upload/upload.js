const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, './../../public/images'))
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname))
  }
})

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
