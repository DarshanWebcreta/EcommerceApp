const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    category:{type:mongoose.Schema.Types.ObjectId,ref:"Category",required:true},
    price:{type:Number,required:true},
    name:{type:String,required:true,unique:true},
    description:{type:String},
    offer:{type:String,},
    image :[{ type: String }],
    weight : {type:String},
    createdAt :{type:Date},
    updatedAt :{type:Date},


})

ProductSchema.pre('save',function(next){
 try{
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
    next()
 }
 catch(e){
    next(e)
 }
})
ProductSchema.pre(['update','findOneAndUpdate','updateOne'],function(next){
    try{
      const data  = this.getUpdate();
      delete data._id
      data.updatedAt = Date.now();
      next();
     
    }
    catch(e){
      next(e);
    }
  })
  


const ProductModel = mongoose.model('Product',ProductSchema);
module.exports = ProductModel;