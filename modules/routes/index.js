module.exports = function(router) {
  /* ------------------ Tracing ------------------ */
  require('./jaeger');
  /* ------------------ Main------------------ */
  require('./authentication')(router);
  require('./database')(router);
};
