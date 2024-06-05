const Usermodel = require('./../model/usermodel')
const {createToken,jwtMiddleWare} = require('./../../jwt')
UserController = {
    createAccount :  async (req,res)=>{
        try{
            const userData = req.body;
            const response = await Usermodel(userData).save();
            res.json({success:true,data:response,message:"Account created successFully"})
        }
        catch(e){
            res.json({success:false,message:e})
        }
    },
    login :  async (req,res)=>{
        try{
            const userData = req.body;
            const response = await Usermodel.findOne({email:userData.email});
            if(response==null){
                res.json({success:false,message:"User not found",data:null})
            }
            else if(response.comparePassword(userData.password)){
                const payload = {
                    id:response.id,
                }
                const token  = createToken(payload)

                res.json({success:true,token:token,message:"Login SuccessFully",data:response,})
            }
            else{
                res.json({success:true,data:null,message:"Please enter valid password"})
              
            }
      
        }
        catch(e){
            console.log(e.message)
            res.status(500).json({success:false,message:e})
        }
    },

    
},

module.exports = UserController