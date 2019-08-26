const Product = require('../models/product');

class ProductController {

  static create(req, res, next) {
    console.log(req.file);
    Product.create({
        artistName: req.body.artistName,
        albumName: req.body.albumName,
        albumCover: req.file.cloudStoragePublicUrl,
        quantity: req.body.quantity,
        price: req.body.price,
        genre: req.body.genre,
        year: req.body.year,
        trackList: req.body.trackList
      })
      .then(response => {
        res.status(201).json(response)
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    Product.findOne({
        _id: req.params.id
      })
      .then(album => {

        res.status(200).json(album)
      })
      .catch(next)
  }

  static findAll(req, res, next) {
    Product.find()
      .then(albums => {
        res.status(200).json(albums)
      })
      .catch(next)
  }

  static update(req, res, next) {
    // console.log(req.body,   'ini');
    Product.updateOne({
      _id: req.params.id
    }, {
      quantity: req.body.currentQuantity
    })
    .then(response => {
      res.status(200).json({ message: 'updated' })
    })
    .catch(next)
  }

  static delete(req, res, next) {
    Product.deleteOne({
      _id: req.params.id
    })
    .then(response => {
      res.status(200).json({ message: 'deleted' })
    })
    .catch(next)
  }

}

module.exports = ProductController