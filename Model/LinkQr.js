const mongoose = require('mongoose')

const LinkQr = new mongoose.Schema({
     user: {
         type: mongoose.Schema.ObjectId,
         required: true,
         ref: "User_sts"
     },
     qrlink: {
        type:String,
        required: true
     },
     qrcolor: {
        type:String,
        required: true
     },
     qrstatus: {
        type: String,
        enum: ['enable','disable'],
        default: 'enable'
     },
     createAt: {
        type: Date,
        default: Date.now
     }
})



module.exports = mongoose.model("link_msts",LinkQr);