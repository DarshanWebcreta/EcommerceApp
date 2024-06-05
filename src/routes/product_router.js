const ProductController = require('./../controller/product_controller')
const ProductRouter = require('express').Router()
const {jwtMiddleWare} = require('./../../jwt')
const multer = require('multer')
const storage  = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./upload')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname)
    }
})
const upload = multer({storage:storage})


ProductRouter.post('/addProduct',jwtMiddleWare,upload.array('images', 5),ProductController.createProduct);
ProductRouter.get('/getAllProducts',jwtMiddleWare,ProductController.getAllProduct);
ProductRouter.get('/getProductsById/:id',jwtMiddleWare,ProductController.getProductById);
ProductRouter.get('/getProductsDetailsById/:id',jwtMiddleWare,ProductController.getProductDetailsById);
//getProductDetailsById
module.exports = ProductRouter;