const Authentication = require('./../../controllers/loginController.js');

module.exports = function(router) {
  /**
   * @swagger
   * /:
   *   get:
   *     summary: Welcome
   *     description: Returns a welcome message
   *     tags:
   *       - Index
   *     responses:
   *       200:
   *         description: 200
   */
  router.get('/', Authentication.welcome);

  /* ------------------ Authentication ------------------ */
  /**
  * @swagger
  * /login:
  *   post:
  *     summary: Login
  *     description: Returns an authtoken for correct credentials.
  *     tags:
  *       - Authentication
  *     parameters:
  *       - in: body
  *         name: user
  *         description: user credentials
  *         schema:
  *           $ref: '#/definitions/User'
  *     responses:
  *       200:
  *         description: authtoken
  */
  router.post('/login', Authentication.login);
  /**
   * @swagger
   * /logout:
   *   get:
   *     summary: Logout
   *     description: logout the user.
   *     tags:
   *       - Authentication
   *     responses:
   *       200:
   *         description: 200
   */
  router.get('/logout', Authentication.logout);
};

/**
  * @swagger
* definitions:
*   User:
*     type: object
*     required:
*       - username
*       - password
*     properties:
*       username:
*         type: string
*       password:
*         type: string
*/
