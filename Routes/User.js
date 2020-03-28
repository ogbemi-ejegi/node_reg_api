const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../Models/User');
const Joi = require('@hapi/joi');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

router.post('/register', async (req, res) => {
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if user already exist
    const userExist = await User.findOne({
        username: req.body.username
    })
    
    //Check if user already exist
    if (userExist) return res.status(400).send('Username already exist');
    const {username, email, password, password2} = req.body;

    //Check if password match
    if(password !== password2) return res.status(400).send('Passwords do not match');

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });
    
    //Save user in database
    try {
        savedUser = await newUser.save();
        res.send({user_id: savedUser._id})
    } catch (error) {
        res.status(400).send(error);
    }

});

router.post('/login', async (req, res) =>{
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if username and password exist and if they are correct
    const user = await User.findOne({username: req.body.username});
    if(!user) return res.status(400).send('Username or password incorrect');

    passwordValid = await bcrypt.compare(req.body.password, user.password);
    if(!passwordValid) return res.status(400).send('Username or password is incrorrect');

    //create and assign a token for the user
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth_token', token).send(token);
    res.send('Success');

    // //create and assign token
    // const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    // //the auth_token in the res.header below is just an identifier
    // res.header('auth_token', token).send(token);
    // res.send('Success');
});

module.exports = router;