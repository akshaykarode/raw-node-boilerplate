const winstonLogger = require('./winston-logger');
const kibanaIndex =
    (global.config.envName === 'production') ?
      'app-production' : 'app-pre-production';
const isClientNeeded = (global.config.envName === 'production') ? true : false;
let result;
if (isClientNeeded) {
  result = winstonLogger.getElasticClient(global.config.elasticsearch.ELASTIC_URL, global.config.elasticsearch.ELASTIC_REQ_TIMEOUT);
} else {
  result = {isConnected: false};
}

const Logger = (result.isConnected) ?
      winstonLogger.elasticLogger(result.client, kibanaIndex, global.config.logger.LOG_LABEL) : winstonLogger.defaultLogger(global.config.logger.LOG_LABEL);
module.exports=Logger;
