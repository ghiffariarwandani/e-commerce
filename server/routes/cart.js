const route = require('express').Router()
const CartController = require('../controllers/cart-controller');
const { authentication, authorization } = require('../middlewares/auth');

route.post('/', authentication, CartController.create)
route.get('/', authentication, CartController.findAll)
route.delete('/deleteall', authentication, CartController.deleteAll)
route.delete('/:id', authentication, authorization, CartController.deleteOne)

module.exports = route