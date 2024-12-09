const express = require('express')
const router = express.Router()

const User = require('../models/Users')

router.post('/', async(req, res)=>{
    // console.log(req.body)
    const userData = new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        date:req.body.date
    })
    try{
        const userToSave = await userData.save()
        res.send(userToSave)
    }catch(err){
        res.send({message:err})
    }
})

module.exports = router