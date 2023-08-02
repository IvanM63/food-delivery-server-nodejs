const express = require('express');
const router = express.Router();

//Mongodb user model
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    //return user list
    User.find().then(data => {
        res.json(data);       
    }).catch(err => {
        console.log(err);
    })   
})

//Signup
router.post('/signup', (req, res) => {
    let {name, email, password, dateOfBirth} = req.body;
    name=name.trim();
    email=email.trim();
    password=password.trim();
    dateOfBirth=dateOfBirth.trim();

    if(name=="" || email=="" || password=="" || dateOfBirth==""){
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        })
    } else if(!/^[a-zA-Z ]*$/.test(name)) {
        res.json({
            status: "FAILED",
            message: "Invalid name format!"
        })
    } else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        res.json({
            status: "FAILED",
            message: "Invalid email format!"
        })
    } else if (!new Date(dateOfBirth).getTime()) {
        res.json({
            status: "FAILED",
            message: "Invalid Date Entered!"
        })
    } else if(password.length < 8) {
        res.json({
            status: "FAILED",
            message: "Password is too short"
        })
    } else {
        //Checking if user already exists
        User.find({email}).then(result => {
            if(result.length) {
                //A user already exists
                res.json({
                    status: "FAILED",
                    message: "User with the provided email already exists!"
                })
            } else {
                //try creating new user

                //password handling
                const bcryptSalt = 10;
                bcrypt.hash(password, bcryptSalt).then((hashedPassword) => {
                    const newUser = new User({
                        name,
                        email,
                        password: hashedPassword,
                        dateOfBirth
                    });
                    newUser.save().then(result => {
                        res.json({
                            status: "SUCCESS",
                            message: "Signup Successful!",
                            data: result
                        })
                    }).catch(err => {
                        res.json({
                            status: "FAILED",
                            message: "An error occured when saving user account!"
                        })
                    });
                }).catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "An error occured when hashing password!"
                    })
                })
            }
        }).catch(err => {
            console.log(err)
            res.json({
                status: "FAILED",
                message: "An error occured when checking for existing user!"
            })
        })
    }
})

//Signin
router.post('/signin', (req, res) => {
    let {email, password} = req.body;
    email=email.trim();
    password=password.trim(); 

    if(email=="" || password==""){
        res.json({
            status: "FAILED",
            message: "Empty credentials fields!"
        })
    } else {
        //try login
        User.find({email}).then((data) => {
            if(data.length) {
                const hashedPassword = data[0].password;
                bcrypt
                .compare(password, hashedPassword)
                .then((result) => {
                    if(result) {
                        res.json({
                            status: "SUCCESS",
                            message: "Signin Successful!",
                            data: data[0]
                        })
                    } else {
                        res.json({
                            status: "FAILED",
                            message: "Invalid password!"
                        })
                    }
                }).catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "Password Wrong"
                    })
                })
            } else {
                res.json({
                    status: "FAILED",
                    message: "Invalid credentials!"
                })
            }       
        }).catch(err => {
            res.json({
                status: "FAILED",
                message: "An error occured when checking for existing user!"
            })
        })
    }
    })

module.exports = router;