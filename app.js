const express = require('express')
const app = express()

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

app.use(bodyParser.json())

const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')
const interactionRoute = require('./routes/interaction')

app.use('/api/user', authRoute)
app.use('/api/post', postRoute)
app.use('/api/interaction', interactionRoute)

mongoose.connect(process.env.DB_CONNECTOR).then(()=>{
    console.log('Your mongoDB connector is on...')
})

app.listen(3000, ()=>{
    console.log('Server is running')
})