const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CartItemsSchema = new schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{
        food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
        quantity: Number
    }],
    totalAmount: Number,
}, { timestamps: true });

const CartItems = mongoose.model('Cart', CartItemsSchema);

module.exports = CartItems;