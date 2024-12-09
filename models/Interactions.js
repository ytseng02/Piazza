const mongoose = require('mongoose')

const interactionSchema = mongoose.Schema({
    post_id:{
        type:String,
        required: true
    },
    user_name:{
        type:String
    },
    like:{
        type:Boolean
    },
    dislike:{
        type:Boolean
    },
    comment:{
        type:String
    }
})

module.exports = mongoose.model('interactions',interactionSchema)