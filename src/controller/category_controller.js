const CategoryModel = require('./../model/category')



const CategoryController = {
    addCategory: async function (req,res){
        try{
            const catModel = CategoryModel({
                title:req.body.title,
                description:req.body.description,
                image:req.file.filename
            })

            const respo = await catModel.save();
            if(respo){
                res.json({status:true,message:"Category added successfully",data:respo})
            }else{
                console.log(" here in upload :",respo)
                res.status(200).json({status:false,message:"Something went wrong",data:null})
            }
        }
        catch(e){
            console.log("Error here in upload :",e)
            res.status(500).json({status:false,message:"Something went wrong",data:null})
        }
    },
    getCategory:async function(req,res){
        try{
            const data  = await CategoryModel.find();
            if(data){
                res.json({status:true,message:"Category found successfully",data:data})
            }
            else{
                res.json({status:false,message:"No category found",data:null})
            }
        }
        catch(e){
            res.status(500).json({status:false,message:e.message,data:null})
        }
    }
}
module.exports = CategoryController;


