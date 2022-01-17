const express = require('express')
const swaggerUI = require('swagger-ui-express')
const swaggerFile = require('./swagger.json')

const routes = express.Router()

routes.get('/teste', (req, res)=>{
    console.log('teste')
})
routes.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

module.exports = routes