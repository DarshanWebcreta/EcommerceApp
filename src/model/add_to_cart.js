const mongoose = require('mongoose')
const AddToCartSchema = mongoose.Schema({
    user:{type:mongoose.Schema.ObjectId,ref:"User"},
    items:{type:[{
        product: { type: mongoose.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
    },],},
    updatedAt: { type: Date },
    createdAt: { type: Date }
   
})

AddToCartSchema.pre('save',function(next){
    try{
        this.updatedAt = Date.now(),
        this.createdAt = Date.now(),
        next()
    }
    catch(e){
        next(e)
    }
})

AddToCartSchema.pre(['update', 'findOneAndUpdate', 'updateOne'],function(next){
    try{
       const data  = this.getUpdate();
       delete data._id;
       this.updatedAt = Date.now()
        next()
    }
    catch(e){
        next(e)
    }
})

const AddToCartModel = mongoose.model('AddToCart',AddToCartSchema);
module.exports = AddToCartModel;