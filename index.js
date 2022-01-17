const express = require('express')
const swaggerUI = require('swagger-ui-express')
const swaggerFile = require('./swagger.json')

const app = express()
const PORT = process.env.PORT || 3333

app.use(express.json())

app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))


app.listen(PORT, ()=> console.log(`Rodando na porta ${PORT}...` ))