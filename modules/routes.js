var Helpers = require('./helpers')
var Authentication = require('./../controllers/loginController.js')
// var dbController = require('./../controllers/dbController.js')

module.exports = function(router){
	router.get("/", Authentication.welcome);
	
	/* ------------------ Authentication ------------------ */
	router.post("/login", Authentication.login);
	router.get("/logout", Authentication.logout);

	/* ------------------ DB Operations------------------ */
	// router.get("/get-users", dbController.getUsers);

}