const jwt = require('jsonwebtoken');
const Cart = require('../models/cart');
const Transaction = require('../models/transaction');

module.exports = {
  authentication(req, res, next) {
    try {
      // console.log(req.headers.token);
      req.decoded = jwt.verify(req.headers.token, `${process.env.SECRET_TOKEN}`)
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  authorization(req, res, next) {
    Cart.findOne({
        _id: req.params.id,
        UserId: req.decoded.id
      })
      .then(found => {
        if (!found) throw new Error('You dont have access')
        else next()
      })
      .catch(next)
  },

  authorizationTransaction(req, res, next) {
    Transaction.findOne({
      _id: req.params.id,
      UserId: req.decoded.id
    })
    .then(found => {
        if(!found) throw new Error('You dont have access')
        else next()
      })
      .catch(next)
  }
};