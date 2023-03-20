require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

// config JSON response
app.use(express.json());

// Models
const User = require('./models/User');

// open route - public route
app.get('/', (req, res) => {
    res.status(200).json({ msg: "Welcome to this API." });
});

// register user
app.post('/auth/register', async(req, res) => {
    const { name, email, password, confirmpassword } = req.body;

    // validations
    if(!name) {
        return res.status(422).json({ msg: 'name is required' });
    }
    if(!email) {
        return res.status(422).json({ msg: 'email is required' });
    }
    if(!password) {
        return res.status(422).json({ msg: 'password is required' });
    }

    if(password !== confirmpassword) {
        return res.status(422).json({ msg: 'Passwords do not match' });
    }

    // check if users exists
    const userExists = await User.findOne({ email: email });
    if(userExists) {
        return res.status(422).json({ msg: 'Use another email.' });
    }

    // create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create user
    const user = new User({
        name, email, password
    });

    try {
        await user.save();
        res.status(201).json({ msg: "User created."});

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Something went wrong. Try again later."})
    }
});

// credencials
const dbuser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbuser}:${dbPass}@cluster0.t2ptu42.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    app.listen(3000);
    console.log('Connected.');
}).catch((err) => console.log(err));
