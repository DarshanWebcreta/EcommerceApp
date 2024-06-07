const AddToCartModel = require('./../model/add_to_cart')

const AddToCartController = {
    addToCart:async function(req,res){
        try{
            const {user,product,quantity}  = req.body;

            const cart = await AddToCartModel.findOne({user:user})


            if(!cart){
                const newCart = AddToCartModel({user:user})
                            //jo aakhu nakhi dais to add nai thai list ma ane manually enter karavu pdse 
                await newCart.items.push({product:product,quantity:quantity})
                const respo = await newCart.save();
                res.json({status:true,message:"Product Added into cart successfully",data :respo})
            }
            else{
                const deleteIFexist = await AddToCartModel.findOneAndUpdate(
                    {user:user,'items.product':product},//condition pela check karse and find karse pachhi niche ni line ma je update karvanu hoi a lakhvanu
                    {$pull:{items:{product:product}}},          //je update karvanu hoi a biji perameter ma aavse 
                    {new:true}//extra perameter for record get
          
                )
                const updateCart = await AddToCartModel.findOneAndUpdate(
                    {user:user},
                    {$push:{items:{product:product,quantity:quantity}}},
                    { new: true }
                ).populate('items.product')
    
                res.json({status:true,message:"Add to cart successfully",data:updateCart})
            }

        }
        catch(e){
            res.status(500).json({status:false,message:"something went wrong",data:null})
        }
    },

    getCartProduct:async (req,res)=>{
        try{
            const cart = await AddToCartModel.findOne({user:req.params.id}).populate("items.product");
            if(!cart){
                res.json({status:true,message:"Empty cart",data:[]})
            }
            else{
                res.json({status:true,message:"Cart items got successFully",data:cart.items})
            }
        }
        catch(e){
            res.status(500).json({status:false,message:"Something went wrong",data:[]})
        }
    },
    deleteFromCart:async (req,res)=>{
        try {
            const { user, product } = req.body;
            const updatedCart = await AddToCartModel.findOneAndUpdate(
                { user: user },
                { $pull: { items: { product: product } } },
                { new: true }
            ).populate("items.product");

            return res.json({ success: true, data: updatedCart.items, message: "Product removed from cart" });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    }
    }





module.exports = AddToCartController;
