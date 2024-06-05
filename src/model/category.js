const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    title:{type:String,required : true,unique:true},
    description:{type:String,default:""},
    createdAt:{type:Date},
    updatedAt:{type:Date},
    image: {type: String,required:true}

})

CategorySchema.pre("save",function(next){
    try{
        this.createdAt = Date.now(),
        this.updatedAt = Date.now();
        next()
    }catch(e){
        next(e)
    }
})

CategorySchema.pre(['update','findOneAndUpdate','updateOne'],function(next){
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

const CategoryModel = mongoose.model("Category",CategorySchema);
module.exports = CategoryModel;



