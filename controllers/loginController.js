const jwt = require('jsonwebtoken');
const jwtconfig = require('./../configs/jwt-config.json');
const CustomError = require('./../modules/comman/error');

exports.welcome = function(req, res, next) {
  // throw new Error()
  // throw new CustomError('DOESNOTEXISTS')

  // global.Logger.log('silly', "127.0.0.1 - there's no place like home");
  // global.Logger.log('debug', "127.0.0.1 - there's no place like home");
  // global.Logger.log('verbose', "127.0.0.1 - there's no place like home");
  // global.Logger.log('info', "127.0.0.1 - there's no place like home");
  // global.Logger.log('warn', "127.0.0.1 - there's no place like home");
  // global.Logger.log('error', "127.0.0.1 - there's no place like home");
  // global.Logger.info("127.0.0.1 - there's no place like home");
  // global.Logger.warn("127.0.0.1 - there's no place like home");
  // global.Logger.error("127.0.0.1 - there's no place like home");

  // Logs with Request Ids
  global.Logger.info('127.0.0.1 - there\'s no place like home', {request_id: '1230232'});
  global.Logger.log('info', '127.0.0.1 - there\'s no place like home', {request_id: '1230232'});
  res.json({status: 200, message: 'Welcome to Raw Express Boilerplate !'});
};

exports.login = function(req, res, next) {
  console.log('login', req.body);
  const user = req.body; // accept all params from body
  const token = jwt.sign(user, jwtconfig.secrete, jwtconfig.tokenOptions); // create a token
  res.json({
    success: true,
    authtoken: token,
  });
};

exports.status = function(req, res, next) {
  console.log('status');
  res.send('Environment : '+global.config.envName+' Application Id : ' + JSON.stringify(req.decoded.Appln_Id) + ' : logged in.');
};

exports.logout = function(req, res, next) {
  console.log('logout'); // client just need to destroy token
  res.json({
    success: true,
    message: 'logout successfully',
  });
};
