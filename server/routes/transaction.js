const route = require('express').Router()
const TransactionController = require('../controllers/transaction-controller');
const { authentication, authorizationTransaction } = require('../middlewares/auth');

route.post('/', authentication, TransactionController.create)
route.get('/admin/paid', authentication, TransactionController.findAllPaid)
route.get('/', authentication, TransactionController.findBelongs)
route.patch('/:id', authentication, authorizationTransaction, TransactionController.update)

module.exports = route