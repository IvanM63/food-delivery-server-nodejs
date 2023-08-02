const mongoose = require('mongoose')
const schema = mongoose.Schema

const FeaturedRestaurantSchema = new schema({
    name: String,
    restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurants' }]
})

const FeaturedRestaurant = mongoose.model('Featured', FeaturedRestaurantSchema);

module.exports = FeaturedRestaurant;