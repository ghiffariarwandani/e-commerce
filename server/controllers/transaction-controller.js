const Trasaction = require('../models/transaction');

class TrasactionController {

  static create(req, res, next) {
    let products = []
    let total = 0
    req.body.forEach(el => {
      products.push(el._id)
      total += el.totalPrice
    })
    Trasaction.create({
      UserId: req.decoded.id,
      ProductId: products,
      totalPayment: total
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static findBelongs(req, res, next) {
    Trasaction.find({
      UserId: req.decoded.id
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static update(req, res, next) {
    Trasaction.updateOne({
      _id: req.params.id
    }, {
      status: req.query.status
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
    
  }

  static findAllPaid(req, res, next) {
    Trasaction.find({
      status: 'paid'
    })
      .them(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }
}

module.exports = TrasactionController