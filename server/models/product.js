const {
  Schema,
  model,
  ObjectId
} = require('mongoose');

const productSchema = new Schema({

  artistName: {
    type: String
  },
  albumName: {
    type: String
  },
  albumCover: {
    type: String
  },
  quantity: {
    type: Number
  },
  price: {
    type: Number
  },
  genre:{
    type: String
  },
  year: {
    type: String
  },
  trackList: {
    type: [String]
  }

}, {
  timestamps: true
})

const Product = model('Product', productSchema)

module.exports = Product