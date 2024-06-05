const ProductModel = require('./../model/products')

const ProductController = {
    createProduct : async function(req,res){
        try{

    const reqData = req.body;
          const proModel = ProductModel({
            category:reqData.category,
            price:reqData.price,
            name:reqData.name,
            description:reqData.description,
            offer:reqData.offer,
            weight:reqData.weight,
            image:req.files.map(file => file.filename)
          });
          
          const respo = await proModel.save();
          if(respo){
            res.json({status:true,message:"Product added successFully",data:respo})
          }
          else{
            res.json({status:false,message:"Something went wrong",data:respo.message})
          }
        }
        catch(e){
            res.status(404).json({status:false,message:"Something went wrong",data:e.message})
        }
    },
    getAllProduct:async function(req,res){
        try{
            const model = await ProductModel.find();
            if(model){
                res.json({status:true,message:"Products Found SuccessFully",data:model})
            }
            else{
                res.json({status:false,message:"No product available",data:null})
            }
        }
        catch(e){
            console.log(e)
            res.status(404).json({status:false,message:e,data:null})
        }
    },
    getProductById:async function(req,res){
        try{
            const id = req.params.id;
         
            const data  = await  ProductModel.find({category:id})
            // badhi product aapi dese jeni categoryid match thase id jode 
            if(data){
                res.json({status:true,message:"Product Got successfully",data :data})
            }
            else{
                res.json({status:true,message:"No Product found",data :null})
            }
        }
        catch(e){
            res.status(404).json({status:false,message:e.message,data :null})
        }
    },
    getProductDetailsById:async function(req,res){
        try{
            const id = req.params.id;
         
            const data  = await  ProductModel.findById(id)
            // badhi product aapi dese jeni categoryid match thase id jode 
            if(data){
                res.json({status:true,message:"Product Got successfully",data :data})
            }
            else{
                res.json({status:true,message:"No Product found",data :null})
            }
        }
        catch(e){
            res.status(404).json({status:false,message:e.message,data :null})
        }
    }
}

module.exports = ProductController;