const mongoose = require('mongoose')

const interactionSchema = mongoose.Schema({
    postId:{
        type:String,
    },
    username:{
        type:String,
        required: true
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
        type:String
    }],
    time_left:{
        type:Number
    }
})

module.exports = mongoose.model('interactions',interactionSchema)