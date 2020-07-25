const util = require('util');
const winston = require('winston');
const WinstonDailyRotateFile = require('winston-daily-rotate-file');
const Elasticsearch = require('winston-elasticsearch');
const moment = require('moment');
const elasticsearch = require('elasticsearch');

exports.elasticLogger = function(client, kibanaIndex, logLabel) {
  return new winston.createLogger({
    format: winston.format.combine(
        winston.format.label({label: logLabel}),
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
      new WinstonDailyRotateFile({
        filename: './logs/%DATE%-error.log',
        level: 'error',
        timestamp: moment.utc().format('YYYY-MMM-DD HH:mm:ss'),
        datePattern: 'DD-MMM-YYYY',
        prepend: true,
        json: false,
      }),
      new WinstonDailyRotateFile({
        filename: './logs/%DATE%-info.log',
        timestamp: moment.utc().format('YYYY-MMM-DD HH:mm:ss'),
        datePattern: 'DD-MMM-YYYY',
        prepend: true,
        json: false,
      }),
      new Elasticsearch({
        level: 'info',
        indexPrefix: kibanaIndex,
        client: client,
      }),
    ],
  });
};
exports.defaultLogger = function(logLabel) {
  return new winston.createLogger({
    format: winston.format.combine(
        winston.format.label({label: logLabel}),
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({filename: './logs/combined.log'}),
    ],
  });
};
/**
 * Returns Elastic Client Object.
 * @param {string} ELASTIC_URL
 * @param {string} ELASTIC_REQ_TIMEOUT
 * @return {object}
 */
exports.getElasticClient = async function(ELASTIC_URL, ELASTIC_REQ_TIMEOUT) {
  try {
    const client = new elasticsearch.Client({
      host: ELASTIC_URL,
      requestTimeout: ELASTIC_REQ_TIMEOUT, // 600000 : setting to 10 mins default value 30 sec
      // log: 'debug',
      keepAlive: true,
    });
    const ping = util.promisify(client.ping);
    await ping({requestTimeout: 1000});
    return {isConnected: true, client: client};
  } catch (e) {
    console.trace('Elasticsearch cluster is down!');
    return {isConnected: false, client: null};
  }
};
