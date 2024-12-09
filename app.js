
// Validate Required Packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Package Initialization
const expressInstance = express();

// Environment and Modules
require('dotenv/config');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

expressInstance.use(bodyParser.json());

expressInstance.use('/api/post', postRoute);
expressInstance.use('/api/user', authRoute);

mongoose.connect(process.env.DB_CONNECTOR).then(()=>{
    console.log('Your mongoDB connector is on...');
});

expressInstance.listen(3000, ()=>{
    console.log('Server is running');
});
