const util = require('util');
const winston = require("winston");
const WinstonDailyRotateFile = require("winston-daily-rotate-file");
const Elasticsearch = require("winston-elasticsearch");
const moment = require('moment');
const elasticsearch = require("elasticsearch");

module.exports = function (config) {
    return async function (req, res, next) {
        // Implement the middleware function based on the config object
        let Logger={}
        let kibanaIndex = 
        (config.envName === "production")
        ? "gl-rule-engine-prod" : "gl-rule-engine-preprod";

        if(config.envName==='development'){
            Logger=winston.createLogger({
                format: winston.format.combine(
                    winston.format.label({ label: config.logger.LOG_LABEL }),
                    winston.format.timestamp(),
                    winston.format.json()
                ),
                transports: [
                    new winston.transports.Console(),
                    new winston.transports.File({ filename: './logs/combined.log' })
                ]
            })
        }else{
            const result = await getElasticClient(config.elasticsearch)
            Logger = (result.isConnected)
            ?   winston.createLogger({
                format: winston.format.combine(
                    winston.format.label({ label: config.LOG_LABEL }),
                    winston.format.timestamp(),
                    winston.format.json()
                ),
                transports: [
                    new WinstonDailyRotateFile({
                    filename: "./logs/%DATE%-error.log",
                    level: "error",
                    timestamp: moment.utc().format("YYYY-MMM-DD HH:mm:ss"),
                    datePattern: "DD-MMM-YYYY",
                    prepend: true,
                    json: false
                    }),
                    new WinstonDailyRotateFile({
                    filename: "./logs/%DATE%-info.log",
                    timestamp: moment.utc().format("YYYY-MMM-DD HH:mm:ss"),
                    datePattern: "DD-MMM-YYYY",
                    prepend: true,
                    json: false
                    }),
                    new Elasticsearch({
                    level: "info",
                    indexPrefix: kibanaIndex,
                    client:result.client
                    })
                ]
            })
            :
            winston.createLogger({
                format: winston.format.combine(
                    winston.format.label({ label: config.logger.LOG_LABEL }),
                    winston.format.timestamp(),
                    winston.format.json()
                ),
                transports: [
                    new winston.transports.Console(),
                    new winston.transports.File({ filename: './logs/combined.log' })
                ]
            })
            
        }
        req.logger=Logger;
        next()
    }
}
/* ------------------- fn ------------------- */
async function getElasticClient(_config){
    try{
        let client = new elasticsearch.Client({
            host: _config.ELASTIC_URL,
            requestTimeout: _config.ELASTIC_REQ_TIMEOUT, // 600000 : setting to 10 mins default value 30 sec
            // log: 'debug',
            keepAlive: true
        });
        const ping = util.promisify(client.ping);
        let result = await ping({requestTimeout: 1000})
        return {isConnected:true,client:client};
    }catch(e){
        console.trace('Elasticsearch cluster is down!');
        return {isConnected:false,client:null};
    }
}