const express = require('express')
const router = express.Router()

const Post = require('../models/Users')

// POST (Create data)
router.post('/', async(req, res)=>{
    const userData = new Post({
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

// GET 1 (Read all)
router.get('/', async(req,res) =>{
    try{
        const getPosts = await Post.find().limit(10)
        res.send(getPosts)
    }catch(err){
        res.send({message:err})
    }
})
// GET 2 (Read by ID)
router.get('/:postId', async(req,res) =>{
    try{
        const getPostById = await Post.findById(req.params.postId)
        res.send(getPostById)
    }catch(err){
        res.send({message:err})
    }
})

// PATCH (Update)
router.patch('/:postId', async(req,res) =>{
    try{
        const updatePostById = await Post.updateOne(
            {_id:req.params.postId},
            {$set:{
                user:req.body.user,
                title:req.body.title,
                text:req.body.text,
                hashtag:req.body.hashtag,
                location:req.body.location,
                url:req.body.url
                }
            })
        res.send(updatePostById)
    }catch(err){
        res.send({message:err})
    }
})

// DELETE (Delete)
router.delete('/:postId',async(req,res)=>{
    try{
        const deletePostById = await Post.deleteOne({_id:req.params.postId})
        res.send(deletePostById)
    }catch(err){
        res.send({message:err})
    }
})

module.exports = router