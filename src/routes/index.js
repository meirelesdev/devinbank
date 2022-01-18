const express = require('express')
const transactionsRoutes = require('./v1/transactionRoutes')
const usersRoutes = require('./v1/userRoutes')
const routes = express.Router()

routes.use('/api/v1/', [usersRoutes,transactionsRoutes])

module.exports = routes