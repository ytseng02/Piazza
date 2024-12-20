const express = require('express')
const router = express.Router()

const Post = require('../models/Posts')
const Interaction = require('../models/Interactions')
const User = require('../models/Users')
const verifyToken = require('../verifyToken')
const res = require('express/lib/response')

// POST (Create data)
router.post('/', verifyToken, async(req, res)=>{
    const postData = new Post({
        post_owner:req.body.post_owner,
        title:req.body.title,
        topic:req.body.topic,
        timestamp:req.body.timestamp,
        postBody:req.body.postBody,
        expiration:req.body.expiration,
        status:req.body.status
    })
    try{
        const postToSave = await postData.save()
        res.send(postToSave)
    }catch(err){
        res.send({message:err})
    }
})

router.post('/:postId/interaction/like', verifyToken, async(req,res)=>{
    const {postId} = req.params
    const {username} = req.body.username
    const currentTime = Date.now()

    try{
        const post = await Post.findById(postId)
        const interactionsData = new Interaction({
            postId:postId,
            username:username,
            likes: post.likes,
            dislike: post.dislikes,
            comments:post.comments
        })
        if(!post){
            return res.status(404).send({message: 'post not found'})
        }
        else if(post.expiration < currentTime) {
            return res.status(404).json({error: "Post expired for performing any action"})
        }

        else if (post.username == username){
            return res.status(404).send({message:'You can not like your own post'})
        }
        post.likes++

        await post.save()
        await interactionsData.save()
        res.send({message:'You liked the post successfully', interactionsData})
    }catch(error){
        res.status(400).send({message: error})
    }
})

router.post('/:postId/interaction/dislike', verifyToken, async(req,res)=>{
    const {postId} = req.params
    const {username} = req.body.username
    const currentTime = Date.now();

    try{
        const post = await Post.findById(postId)
        const interactionsData = new Interaction({
            postId:postId,
            username:username,
            likes: post.likes,
            dislike: post.dislikes,
            comments:post.comments
        })
        if(!post){
            return res.status(404).send({message: 'post not found'})
        }
        else if(post.expiration < currentTime) {
            return res.status(404).json({error: "Post expired for performing any action"})
        }
        else if (post.username == username){
            return res.status(404).send({message:'You can not dislike your own post'})
        }
        post.dislikes++
        console.log(interactionsData)

        await post.save()
        await interactionsData.save()
        res.send({message:'You disliked the post successfully', post})
    }catch(error){
        res.status(400).send({message: error})
    }
})

router.post('/:postId/interaction/comment', verifyToken, async(req,res)=>{
    const {postId} = req.params
    const currentTime = Date.now()
    
    try{
        const post = await Post.findById(postId)
        const interactionsData = new Interaction({
            postId:postId,
            username:req.body.username,
            likes: post.likes,
            dislike: post.dislikes,
            comments: req.body.username +': '+req.body.comment
        })
        
        if(!post){
            return res.status(404).send({message: 'post not found'})
        }
        else if(post.expiration < currentTime) {
            return res.status(404).json({error: "Post expired for performing any action"})
        }
        post.comments.push(req.body.username +': '+req.body.comment)
        
        await post.save()
        await interactionsData.save()
        res.send({message:'Your comment on the post successfully', interactionsData})
    }catch(error){
        res.status(400).send({message: error})
    }
})


// GET 1 (Read all)
router.get('/',verifyToken, async(req,res) =>{
    try{
        const getPosts = await Post.find().limit(10)
        res.send(getPosts)
    }catch(err){
        res.send({message:err})
    }
})
// GET 2 (Read by ID)
router.get('/:postId', verifyToken, async(req,res) =>{
    try{
        const getPostById = await Post.findById(req.params.postId)
        res.send(getPostById)
    }catch(err){
        res.send({message:err})
    }
})

// PATCH (Update)
router.patch('/:postId', verifyToken, async(req,res) =>{
    try{
        const updatePostById = await Interaction.updateOne(
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
router.delete('/:postId', verifyToken, async(req,res)=>{
    try{
        const deletePostById = await User.deleteOne({_id:req.params.postId})
        res.send(deletePostById)
    }catch(err){
        res.send({message:err})
    }
})

// GET 3 (Read by topic)
router.get('/topic/:topic', verifyToken, async(req,res) =>{
    try{
        const getPosts = await Post.find({topic: req.params.topic})
        res.send(getPosts)
    }catch(err){
        res.send({message:err})
    }
})

// GET 4 (Read by active)
router.get('/status/active', verifyToken, async(req,res) =>{
    const currentTime = Date.now()
    try{
        getActivePosts = []
        const allPosts = await Post.find()
        for (var i = 0; i < allPosts.length; i++) {
            if (Date.parse(allPosts[i].expiration) > currentTime){
                getActivePosts.push(allPosts[i])
            }
        }
        res.send(getActivePosts)
    }catch(err){
        res.send({message:err})
    }
})

// // GET 5 (Read by expired)
router.get('/status/inactive', verifyToken, async(req,res) =>{
    const currentTime = Date.now()
    try{
        getActivePosts = []
        const allPosts = await Post.find()
        for (var i = 0; i < allPosts.length; i++) {
            if (Date.parse(allPosts[i].expiration) < currentTime){
                getActivePosts.push(allPosts[i])
            }
        }
        res.send(getActivePosts)
    }catch(err){
        res.send({message:err})
    }
})

// GET 6 (Read by the highest active post)
router.get('/highest/active', verifyToken, async(req,res) =>{
    const currentTime = Date.now()
    try{
        getActivePosts = []
        const allPosts = await Post.find()
        for (var i = 0; i < allPosts.length; i++) {
            if (Date.parse(allPosts[i].expiration) > currentTime){
                getActivePosts.push(allPosts[i])
            }
        }
        var highestActivePost = getActivePosts[0]
        var highestSum = 0
        for (var i = 0; i < getActivePosts.length ; i++) {
            var sumlikes = getActivePosts[i].likes + getActivePosts[i].dislikes
            if (sumlikes > highestSum){
                highestSum = sumlikes
                highestActivePost = getActivePosts[i]
            }
        }
        res.send(highestActivePost)
    }catch(err){
        res.send({message:err})
    }
})

// GET 7 (Read by active topic)
router.get('/status/active/:topic', verifyToken, async(req,res) =>{
    const currentTime = Date.now()
    try{
        getActivePosts = []
        const allPosts = await Post.find()
        for (var i = 0; i < allPosts.length; i++) {
            if (Date.parse(allPosts[i].expiration) > currentTime){
                getActivePosts.push(allPosts[i])
            }
        }
        const ActiveTopicPosts = await Post.find({topic: req.params.topic})
        res.send(ActiveTopicPosts)
    }catch(err){
        res.send({message:err})
    }
})

// GET 7 (Read by inactive topic)
router.get('/status/inactive/:topic', verifyToken, async(req,res) =>{
    const currentTime = Date.now()
    try{
        getInactivePosts = []
        const allPosts = await Post.find()
        for (var i = 0; i < allPosts.length; i++) {
            if (Date.parse(allPosts[i].expiration) < currentTime){
                getInactivePosts.push(allPosts[i])
            }
        }
        const InactiveTopicPosts = await Post.find({topic: req.params.topic})
        if (InactiveTopicPosts.length === 0) {
            return res.status(404).json({ error: 'No expired posts found for this topic'})
        }
        res.send(InactiveTopicPosts)
    }catch(err){
        res.send({message:err})
    }
})
module.exports = router

