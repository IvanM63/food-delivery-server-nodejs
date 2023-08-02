const express = require('express');
const router = express.Router();

//Mongodb restaurants model
const Restaurants = require('../models/Restaurants');

//Get restaurant by id
router.get('/:id', (req, res) => {
    Restaurants.findById(req.params.id).then(result => {
        res.json({
            status: "SUCCESS",
            message: "Restaurant found",
            data: result
        })
    }).catch(err => {
        res.json({
            status: "FAILED",
            message: "An error occured while searching restaurant",
            error: err
        })
    })
})

//Get all restaurants
router.get('/', (req, res) => {
    Restaurants.find().then(result => {
        res.json({
            status: "SUCCESS",
            message: "Restaurant found",
            data: result
        })
    }).catch(err => {
        res.json({
            status: "FAILED",
            message: "An error occured while searching restaurant",
            error: err
        })
    })
})


//Router add restaurants
router.post('/add', (req, res) => {
    let {name, description, image, rating, reviews, location} = req.body;
    name=name.trim();
    description=description.trim();
    image=image.trim();
    reviews=reviews.trim();
    location.address=location.address.trim();
    location.city= location.city.trim();

    //console.log(req.body);

    if(name=="" ||
    description=="" ||
    image=="" ||
    rating=="" ||
    reviews=="" ||
    location==null ) {
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        })
    } else {
        const newRestaurants = new Restaurants({
            name,
            description,
            image,
            rating,
            reviews,
            location,
        })
        newRestaurants.save().then(result => {
            res.json({
                status: "SUCCESS",
                message: "Restaurant added successfully",
                data: result
            })
        }).catch(err => {
            res.json({
                status: "FAILED",
                message: "An error occured while adding restaurant",
                error: err
            })
        })
    }
})

module.exports = router;