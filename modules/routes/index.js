module.exports = function(router) {
  /* ------------------ Main------------------ */
  require('./authentication')(router);
  require('./database')(router);
};
