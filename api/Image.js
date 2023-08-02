const express = require('express');
const router = express.Router();

//Mongodb Image model
const Image = require('../models/image')

router.get('/', (req, res) => {
    Image.find().then(result => {
        res.json({
            status: "SUCCESS",
            message: "Image fetched successfully",
            data: result
        })
    }).catch(err => {
        res.json({
            status: "FAILED",
            message: "An error occurred while fetching image",
            error: err
        })
    })
})

//Router add Image
router.post('/add', (req, res) => {
    let {name, image} = req.body;
    name=name.trim();

    if(name=="" ||
    image=="") {
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        })
    } else if(!req.file) {
        res.json({
            status: "FAILED",
            message: "Please select an image to upload"
        })
    }else {
        const newImage = new Image({
            name,
            image : req.file.path
        })
        newImage.save().then(result => {
            res.json({
                status: "SUCCESS",
                message: "Image added successfully",
                data: result
            })
        }
        ).catch(err => {
            res.json({
                status: "FAILED",
                message: "An error occurred while adding image",
                error: err
            })
        })   
    }
})

module.exports = router;