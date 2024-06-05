const mongoose = require('mongoose')
const uuid = require('uuid')
const bcrypt = require('bcrypt')
const UserSchema = mongoose.Schema({
    id:{type : String,unique:true},//firebase ni id store karava mate aa add kari if infuture aave to 
    fullName:{type:String,default:""},
    email:{type:String , unique:true, required:[true,"add karne bhai tu "]},
    password:{type:String,required:true},
    phoneNumber:{type:String,default:""},
    city:{type:String,default:"",required:[true,"add karne bhai tu "]},
    state:{type:String,default:""},
    profileProgress :{type:Number,default:0},
    //0 for just account created without other details , if it will one then its completed filled 
    //if 0 then redirect to profile after login
    createdAt:{type:Date } ,
    updatedAt:{type:Date}
})
//user banta pela mare userni id and createAt and updatedAt ne fill karavi chhe 
UserSchema.pre('save',function(next){
    try{
        if(!this.isModified('password')) return next();
        this.id = uuid.v1()
        this.createdAt = Date.now();
      
        //getSalt() use karisu to await aavse genSaltSync aa use karsu to await ni jarur nai 
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password,salt);
        next();
    }catch(e){
        next(e);
    }
})

UserSchema.pre(['update','findOneAndUpdate','updateOne'],function(next){
    // aano use main _id and id update na thay by chance pan ani mate use karyu chhe aane change na kari sakiye 
    const data  = this.getUpdate();
    delete data.id;
    delete data._id

    data.updatedAt = Date.now();
    next();
   
})
UserSchema.methods.comparePassword = function(pass){
    try{
        const isMatch = bcrypt.compareSync(pass,this.password);
        return isMatch;
    }
    catch(e){
        console.log("erroe in compare password")

        throw e
    }
    
}

//
const UserModel = mongoose.model('User',UserSchema);
module.exports = UserModel;