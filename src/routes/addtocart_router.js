const AddToCartController = require('./../controller/addtocart_controller')
const CartRoutes = require('express').Router()


CartRoutes.post('/addToCart',AddToCartController.addToCart),
CartRoutes.get('/getMyCart/:id',AddToCartController.getCartProduct),
CartRoutes.post('/deleteItem',AddToCartController.deleteFromCart),

module.exports = CartRoutes;