const migrationDB = require('./../modules/util/database/models/db_migration');

exports.getUsers = async function(req, res, next) {
  const result = await migrationDB.raw_express_boilerplate_users.findAll({});
  res.status(200).send(result);
};

/* ----------------------methods---------------------- */

/* ----------------------methods---------------------- */
