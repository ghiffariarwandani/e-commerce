const route = require('express').Router()
const ProductController = require('../controllers/product-controller');
const { multer,sendUploadToGCS } = require('../helpers/image');

route.post('/', multer.single('albumCover'), sendUploadToGCS, ProductController.create)
route.get('/', ProductController.findAll)
route.get('/:id', ProductController.findOne)
route.patch('/:id', ProductController.update)

module.exports = route