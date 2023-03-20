require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

// config JSON response
app.use(express.json());

// open route - public route
app.get('/', (req, res) => {
    res.status(200).json({ msg: "Welcome to this API." });
});

// register user
app.post('/auth/register', async(req, res) => {
    const { name, email, password, confirmpassword } = req.body;
    // validations
    if(!name) {
        return res.status(422).json({ msg: 'Name is required' });
    }
});

// credencials
const dbuser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbuser}:${dbPass}@cluster0.t2ptu42.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    app.listen(3000);
    console.log('Connected.');
}).catch((err) => console.log(err));
