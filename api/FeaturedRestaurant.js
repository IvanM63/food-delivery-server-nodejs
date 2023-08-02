const express = require('express');
const router = express.Router();

//Mongodb restaurants model
const FeaturedRestaurant = require('../models/FeaturedRestaurant');
const { route } = require('./Food');

//get all featured restaurants
router.get('/', (req, res) => {
    FeaturedRestaurant.find().populate('restaurants').then(result => {
        res.json({
            status: "SUCCESS",
            message: "Featured Restaurants found",
            data: result
        })
    }).catch(err => {
        res.json({
            status: "FAILED",
            message: "An error occured while searching featured restaurants",
            error: err
        })
    })
})

//Get restaurants from featured restaurant and put it in an array
router.get('/:name', (req, res) => {
    FeaturedRestaurant.find({name: req.params.name}).populate('restaurants').then(result => {
        res.json({
            status: "SUCCESS",
            message: "Featured Restaurant found",
            data: result
        })
    }).catch(err => {
        res.json({
            status: "FAILED",
            message: "An error occured while searching featured restaurant",
            error: err
        })
    })
})

//add featured restaurant
router.post('/add', (req, res) => {
    let {name, restaurants} = req.body;
    name=name.trim();

    if(name=="") {
        return res.json({
            status: "FAILED",
            message: "Empty input fields"
        })
    }

    const newFeaturedRestaurant = new FeaturedRestaurant({
        name,
        restaurants
    })

    try {
        newFeaturedRestaurant.save();
        res.json({
            status: "SUCCESS",
            message: "Featured Restaurant added successfully",
            data: newFeaturedRestaurant
        })
    } catch (error) {
        res.json({
            status: "FAILED",
            message: "Unable to add featured restaurant",
            error: error
        })
    }
});

module.exports = router;