const express = require('express')
const router = express.Router()

const Post = require('../models/Posts')

// POST (Create data)
router.post('/', async(req, res)=>{
    const postData = new Post({
        post_id:req.body.post_id,
        post_owner:req.body.post_owner,
        title:req.body.title,
        topic:req.body.topic,
        timestamp:req.body.timestamp,
        postBody:req.body.postBody,
        expiration_time:req.body.expiration_time,
        status:req.body.status
    })
    try{
        const postToSave = await postData.save()
        res.send(postToSave)
    }catch(err){
        res.send({message:err})
    }
})

module.exports = router