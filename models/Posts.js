const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const postSchema = mongoose.Schema({
    post_id:{
        type:String,
        required: true,
        default: uuidv4,
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
    }
})

module.exports = mongoose.model('posts',postSchema)