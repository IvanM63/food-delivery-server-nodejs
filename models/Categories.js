const mongoose = require('mongoose')
const schema = mongoose.Schema

const CategoriesSchema = new schema({
    name: String,
    restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurants' }]
})

const Categories = mongoose.model('Categories', CategoriesSchema);

module.exports = Categories;