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

app.use(routes)
const options = {
    validatorUrl: null,
    docExpansion: 'full',
};

const swaggerUiOpts2 = {
    explorer: false,
    swaggerOptions: options,
    customCss: '.swagger-ui .topbar { background-color: #c30ddb }',
    swaggerUrl: null,
    customJs: '',
    operationsSorter: 'alpha',
    customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css'
}

app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile, swaggerUiOpts2))

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}...`))