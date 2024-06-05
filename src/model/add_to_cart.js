const mongoose = require('mongoose')
const AddToCartSchema = mongoose.Schema({
    user:{type:mongoose.Schema.ObjectId,ref:"User"}
})