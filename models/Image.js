const mongoose = require('mongoose')
const schema = mongoose.Schema

const ImageSchema = new schema({
    name: String,
    image: String,
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;