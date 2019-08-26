const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
    ProductId: { type: Schema.Types.ObjectId, ref: 'Product' },
    UserId : { type: Schema.Types.ObjectId, ref: 'User' },
    quantity: { type: Number },
    totalPrice: { type: Number }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;