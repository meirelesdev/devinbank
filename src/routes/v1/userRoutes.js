const express = require('express')
const usersRoutes = express.Router()
const userController = require('../../controllers/userController')

usersRoutes.post('/users/singup', userController.singup)
usersRoutes.patch('/users/:userID', userController.update)
usersRoutes.get('/users/:userID', userController.show)
usersRoutes.get('/users', userController.index)

module.exports = usersRoutes