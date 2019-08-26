const Cart = require('../models/cart');
const Product = require('../models/product');

class CartController {

  static create(req, res, next) {
    Cart.findOne({
        ProductId: req.body.product._id
      })
      .then(cart => {
        if (cart) {
          cart.quantity += 1
          cart.totalPrice += req.body.product.price
          return cart.save()
            .then(cart => {
              res.status(201).json(cart)
            })
            .catch(next)
        } else {
          Cart.create({
              ProductId: req.body.product._id,
              UserId: req.decoded.id,
              quantity: 1,
              totalPrice: req.body.product.price
            })
            .then(cart => {
              console.log(cart);
              res.status(201).json(cart)
            })
            .catch(next)
        }
      })
      .catch(next)
  }

  static findAll(req, res, next) {
    Cart.find({ UserId: req.decoded.id })
      .populate('ProductId')
      .populate('UserId', 'username')
      .then(carts => {
        res.status(200).json(carts)
      })
      .catch(next)
  }

  static deleteOne(req, res, next) {
    Cart.deleteOne({
      _id: req.params.id
    })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static deleteAll (req, res, next) {
    console.log(req.headers.token);
    console.log(req.decoded);
    Cart.deleteMany({
      UserId: req.decoded.id
    })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch(next)
  }

}

module.exports = CartController