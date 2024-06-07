const express  = require('express');
const bodyparser = require('body-parser')
const app = express();
const morgan  = require('morgan')
const db = require('./../db')
require('dotenv').config()
const helmet = require('morgan')
const UserRouter = require('./routes/user_routes')
const CategoryRouter = require('./routes/category_router')
const ProductRouter = require('./routes/product_router')
const CartRoutes = require('./routes/addtocart_router')
const cors = require('cors')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))//true hase to file and string c y na bija data pan smji skse 
app.use(helmet());
app.use(morgan("dev"))
app.use(cors())
app.use('/api/user',UserRouter);
app.use('/api/category',CategoryRouter);
app.use('/api/product',ProductRouter);
app.use('/api/cart',CartRoutes)
app.use('/files',express.static('./upload'))

//aana thi files thi path bnse and jyare access kariye aane
//tyare /files/imagename lagse aa file path mate chhe 
//public access mate chhe



app.listen(process.env.PORT||3000,()=>{
    console.log("Port listning")
})


