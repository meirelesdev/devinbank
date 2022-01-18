const swaggerAutogen = require('swagger-autogen')();
const doc = require('./default-doc')

const outputFile = './swagger.json';
const endpointsFiles = ['./src/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);