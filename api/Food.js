const express = require('express');
const router = express.Router();

//Mongodb restaurants model
const Food = require('../models/Food');

//Get all food from restaurantId
router.get('/restaurant/:id', (req, res) => {
    Food.find({ restaurantId: req.params.id }).then(result => {
        res.json({
            status: "SUCCESS",
            message: "Food found",
            data: result
        })
    }).catch(err => {
        res.json({
            status: "FAILED",
            message: "An error occured while searching food",
            error: err
        })
    })
})

//Get Food by id
router.get('/:id', (req, res) => {
    Food.findById(req.params.id).then(result => {
        res.json({
            status: "SUCCESS",
            message: "Food found",
            data: result
        })
    }).catch(err => {
        res.json({
            status: "FAILED",
            message: "An error occured while searching food",
            error: err
        })
    })
})

//Get all food
router.get('/', (req, res) => {
    Food.find().then(result => {
        res.json({
            status: "SUCCESS",
            message: "Food found",
            data: result
        })
    }).catch(err => {
        res.json({
            status: "FAILED",
            message: "An error occured while searching food",
            error: err
        })
    })
})


//Router add food
router.post('/add', (req, res) => {
    let {name, description, price, image, restaurantId} = req.body;
    name=name.trim();
    description=description.trim();
    image=image.trim();
    restaurantId=restaurantId.trim();


    console.log(req.body);

    if(name=="" ||
        description=="" ||
        price=="" ||
        image=="" ||
        restaurantId=="") {
        return res.json({
            status: "FAILED",
            message: "Empty input fields"
        })
    }

    const food = new Food({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        restaurantId,
    })

    try {
        food.save().then(result => {
            res.json({
                status: "SUCCESS",
                message: "Food added",
                data: result
            })
        })
    } catch (error) {
        res.json({
            status: "FAILED",
            message: "An error occured while adding food",
            error: err
        })
    }
})

module.exports = router;