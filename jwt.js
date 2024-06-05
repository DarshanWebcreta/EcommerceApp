const jwt = require('jsonwebtoken')

const createToken = (payload)=>{
    try{
        const token  =  jwt.sign(payload,process.env.JWT_SEC_KEY,{expiresIn:20000});
        return token;
    }
    catch(e){
        throw e;
    }
}

const jwtMiddleWare =  (req,res,next)=>{
    try{
        const auth = req.headers.authorization;
      
    
        if(!auth){
            return res.status(404).json({status:false,message:"No Authorities found",data:null})
        }
        const token  =  auth.split(' ')[1];
         if(!token){
            return res.status(404).json({status:false,message:"No token found",data:null})``
        }
        else{
            const tokenRes = jwt.verify(token,process.env.JWT_SEC_KEY);
            req.tokenData = tokenRes;
            next();
        }
       
    }

    catch(e){
        console.log("Error is here bro :",e)
        return res.status(404).json({status:false,message:e.message,data:null})
    }
}

module.exports = {createToken,jwtMiddleWare};