const express = require('express')
const usersRoutes = express.Router()
const userController = require('../../controllers/userController')

usersRoutes.get('/users', userController.index)
usersRoutes.get('/users/:userID', userController.show)
usersRoutes.post('/singup', userController.singup)
usersRoutes.post('/singin', userController.singin)
usersRoutes.patch('/users/:userID', userController.update)

module.exports = usersRoutes