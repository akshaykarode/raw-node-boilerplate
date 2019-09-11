var jwt  = require('jsonwebtoken');
var Helpers = require('./../modules/helpers');
var jwtconfig = require('./../configs/jwt-config.json')

exports.welcome = function(req, res ,next) {
  req.logger.log('silly', "127.0.0.1 - there's no place like home");
  req.logger.log('debug', "127.0.0.1 - there's no place like home");
  req.logger.log('verbose', "127.0.0.1 - there's no place like home");
  req.logger.log('info', "127.0.0.1 - there's no place like home");
  req.logger.log('warn', "127.0.0.1 - there's no place like home");
  req.logger.log('error', "127.0.0.1 - there's no place like home");
  req.logger.info("127.0.0.1 - there's no place like home");
  req.logger.warn("127.0.0.1 - there's no place like home");
  req.logger.error("127.0.0.1 - there's no place like home");
  res.json({status:200,message:"Welcome to Raw Express Boilerplate !"})
};

exports.login = function(req, res , next) {
  console.log('login',req.body)
  var user = req.body // accept all params from body
  var token = jwt.sign(user,jwtconfig.secrete,jwtconfig.tokenOptions); // create a token
  res.json({
    success: true,
    authtoken: token
  })
};

exports.status = function(req, res ,next) {
 	console.log('status')
  res.send('Environment : '+config.envName+' Application Id : ' + JSON.stringify(req.decoded.Appln_Id) + " : logged in.");
};

exports.logout = function(req, res , next) {
 	console.log('logout') // client just need to destroy token
  res.json({
    success: true,
    message: 'logout successfully'
  })
};
