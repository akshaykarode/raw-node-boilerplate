const db_migrationDB = require("./../modules/infra/database/models/db_migration");

exports.getUsers = async function(req, res, next) {
	var result = await db_migrationDB.raw_express_boilerplate_users.findAll({})
	res.status(200).send(result)
}

/* ----------------------methods---------------------- */

/* ----------------------methods---------------------- */