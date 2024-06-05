const UserRouter = require('express').Router()
const UserController = require('./../controller/user_controller')


UserRouter.post('/createAccount',UserController.createAccount)
UserRouter.post('/login',UserController.login)


module.exports = UserRouter;