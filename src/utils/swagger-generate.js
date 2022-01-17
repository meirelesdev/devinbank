const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'DevInBank',
        description: 'Bom vindo, aqui você encontra todos os endpoints da API DevInBank.',
    },
    host: 'localhost:3333',
    schemes: ['http'],
};
const outputFile = './swagger.json';
const endpointsFiles = ['./src/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);