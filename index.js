const express = require('express')
const cors = require('cors')
const routes = require('./src/routes')
const swaggerUI = require('swagger-ui-express')
const swaggerFile = require('./swagger.json')

const app = express()
const PORT = process.env.PORT || 3333
const bodyParser = express.json()

app.use(bodyParser)
app.use(cors())

app.use(express.json())
app.use(express.static('public'));

app.use(routes)

const swaggerUiOpts = {
    customJs: '/assets/js/swagger-js-custom.js',
    customCssUrl: '/assets/css/swagger-css-custom.css',
    customSiteTitle: "DevInBank | Conta365",
    customfavIcon: "./favicon-32x32.png"
}

app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile, swaggerUiOpts))

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}...`))