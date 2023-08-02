//mongo.db
require('./config/db')

const multer = require('multer');
const app = require('express')();
const path = require('path');
const port = process.env.PORT || 3000;

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const UseRouter = require('./api/User');
const RestaurantsRouter = require('./api/Restaurants');
const FoodRouter = require('./api/Food');
const Image = require('./api/Image');
const CategoriesRouter = require('./api/Categories');
const FeaturedRestaurantRouter = require('./api/FeaturedRestaurant');

const bodyParser = require('express').json;
app.use(bodyParser());
app.use('/images', require('express').static(path.join(__dirname, 'images')));
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));

app.use('/user', UseRouter);
app.use('/restaurants', RestaurantsRouter);
app.use('/food', FoodRouter);
app.use('/images', Image);
app.use('/categories', CategoriesRouter);
app.use('/featuredRestaurant', FeaturedRestaurantRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})