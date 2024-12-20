const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const postSchema = mongoose.Schema({
    post_id:{
        type:String,
    },
    post_owner:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required: true,
        enum: ['Politics', 'Health', 'Sport', 'Tech']
    },
    timestamp:{
        type:Date,
        default: Date.now
    },
    postBody:{
        type:String,
        required:true
    },
    expiration:{
        type:Date,
        expires:Number,
        default: () => {
            const now = new Date();
            now.setDate(now.getDate()+7);
            return now;
        }
    },
    status:{
        type:String,
        enum: ['Live', 'Expired'],
        default: 'Live'
    },
    likes:{
        type:Number,
        default:0
    },
    dislikes:{
        type:Number,
        default:0
    },
    comments:[{
        type:String,
        default: "No comments"
        
    }],
    time_left:{
        type:Number
    }

})

module.exports = mongoose.model('posts',postSchema)