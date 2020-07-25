const Helpers = require('./../comman/helpers');
const dbController = require('./../../controllers/dbController.js');

module.exports = function(router) {
  /* ------------------ DB Operations------------------ */
  router.post('/get-users', Helpers.checkAuth, dbController.getUsers);
};
