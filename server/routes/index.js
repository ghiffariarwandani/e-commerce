const route = require('express').Router()
const userRoute = require('./user');
const productRoute = require('./product');
const cartRoute = require('./cart');
const transactionRoute = require('./transaction');

route.use('/user', userRoute)
route.use('/product', productRoute)
route.use('/cart', cartRoute)
route.use('/transaction', transactionRoute)

module.exports = route