const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    post_id:{
        type:String,
        required: true
    },
    post_owner:{
        type:String
    },
    title:{
        type:String
    },
    topic:{
        type:[String],
        required: true,
        enum: ['Politics', 'Health', 'Sport', 'Tech']
    },
    timestamp:{
        type:Date,
        default: Date.now
    },
    postBody:{
        type:String
    },
    expiration_time:{
        type:Number
    },
    status:{
        type:String,
        enum: ['Live', 'Expired'],
        default: 'Live'
    },
    like_sum:{
        type:Number
    },
    dislike_sum:{
        type:Number
    }
})

module.exports = mongoose.model('posts',postSchema)