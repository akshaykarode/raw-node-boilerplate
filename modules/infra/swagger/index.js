const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./../swagger/swagger.json');

module.exports = function(router){
	/* ------------------ Swagger Generation ------------------ */
	if(config.swagger.enable){
		router.use('/api-docs', swaggerUi.serve);
		router.get('/api-docs', swaggerUi.setup(swaggerDocument));
	}
}