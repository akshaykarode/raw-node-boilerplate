const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      version: '1.0.0',
      title: 'Raw Node Boilerplate Application API',
      description: 'Sample API Docs.',
    },
    host: 'localhost:4000',
    basePath: '/',
    schemes: [
      'http',
    ],
    consumes: [
      'application/json',
    ],
    produces: [
      'application/json',
    ],
  },
  apis: ['./modules/routes/*'], // Path to the API docs
};
const swaggerSpec = swaggerJSDoc(options);

/* global config, basedir */

module.exports = function(router) {
  /* ------------------ Swagger Generation ------------------ */
  if (global.config.swagger.enable) {
    router.get('/api-docs.json', function(req, res) {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
    });
    router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
};
