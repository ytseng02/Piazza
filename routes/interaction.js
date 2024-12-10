const express = require('express')
const router = express.Router()

const Interaction = require('../models/Interactions')

// POST (Create data)
router.post('/', async(req, res)=>{
    const interactionData = new Interaction({
        post_id:req.body.post_id,
        user_name:req.body.user_name,
        like:req.body.like,
        dislike:req.body.dislike,
        comment:req.body.comment
    })
    try{
        const interactToSave = await interactionData.save()
        res.send(interactToSave)
    }catch(err){
        res.send({message:err})
    }
})

module.exports = router