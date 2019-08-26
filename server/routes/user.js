const route = require('express').Router()
const UserController = require('../controllers/user-controller');
const { authentication } = require('../middlewares/auth');

route.post('/signup', UserController.signup)
route.post('/signin', UserController.signin)
route.post('/signGoogle', UserController.signinGoogle)
route.get('/:id', authentication, UserController.findOne)

module.exports = route