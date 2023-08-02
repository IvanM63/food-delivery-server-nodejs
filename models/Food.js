const mongoose = require('mongoose')
const schema = mongoose.Schema

const FoodSchema = new schema({
    name: String,
    description: String,
    price: Number,
    image: String,
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurants' }
});

const Food = mongoose.model('Food', FoodSchema);

module.exports = Food;