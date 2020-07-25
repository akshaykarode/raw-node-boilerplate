const Authentication = require('./../../controllers/loginController.js');
const {track} = require('express-jaeger');

module.exports = function(router) {
  router.get('/', track('/index'), Authentication.welcome);

  /* ------------------ Authentication ------------------ */
  router.post('/login', track('/login'), Authentication.login);
  router.get('/logout', track('/logout'), Authentication.logout);
};
