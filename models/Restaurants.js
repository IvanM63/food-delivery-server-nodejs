const FoodSchema = require('./Food')
const mongoose = require('mongoose')
const schema = mongoose.Schema

const RestaurantsSchema = new schema({
    name: String,
    description: String,
    image: String,
    rating: Number,
    reviews: String,
    location: {
        address: String,
        city: String,
        latitude: Number,
        longitude: Number,
    },

});

const Restaurants = mongoose.model('Restaurants', RestaurantsSchema);

module.exports = Restaurants;