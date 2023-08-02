const express = require('express');
const router = express.Router();

//Mongodb restaurants model
const Categories = require('../models/Categories');
const { route } = require('./Food');

//Get all restaurant from categories by name
router.get('/:name', (req, res) => {
    Categories.find({name: req.params.name}).then(result => {
        res.json({
            status: "SUCCESS",
            message: "Categories found",
            data: result
        })
    }).catch(err => {
        res.json({
            status: "FAILED",
            message: "An error occured while searching categories",
            error: err
        })
    })
})

//Add Categories
router.post('/add', (req, res) => {
    let {name, restaurants} = req.body;
    name=name.trim();

    if(name=="") {
        return res.json({
            status: "FAILED",
            message: "Empty input fields"
        })
    }

    const newCategories = new Categories({
        name,
        restaurants
    })

    try {
        newCategories.save();
        res.json({
            status: "SUCCESS",
            message: "Categories added successfully",
            data: newCategories
        })
    } catch (error) {
        res.json({
            status: "FAILED",
            message: "Unable to add categories",
            error: error
        })
    }
});

module.exports = router;