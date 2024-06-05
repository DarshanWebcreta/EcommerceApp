const CategoryRouter = require('express').Router()
const CategoryController = require('./../controller/category_controller')
const {createToken,jwtMiddleWare} = require('./../../jwt')
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
CategoryRouter.post('/addCategory',upload.single('image'),jwtMiddleWare,CategoryController.addCategory),
CategoryRouter.get("/getAllCategories",jwtMiddleWare,CategoryController.getCategory)


module.exports = CategoryRouter;