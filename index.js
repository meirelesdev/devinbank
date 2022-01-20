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

const cssSwagger = [
    'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-feeling-blue.css',
    'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-flattop.css',
    'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-material.css',
    'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-monokai.css',
    'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-muted.css',
    'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css',
    'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-monokai.css',
    'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-outline.css',
]
const swaggerUiOpts2 = {
    explorer: false,
    // swaggerOptions: options,
    // swaggerUrl: null,
    operationsSorter: 'alpha',
    customJs: '/swagger-js-custom.js',
    // customCssUrl: '/assets/css/swagger-css-custom.css',
    // customCssUrl: cssSwagger[7],
}

app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile, swaggerUiOpts2))

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}...`))