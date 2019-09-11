var Q = require('q'),
		_ = require('lodash'),
		forEach = require('async-foreach').forEach,
		Helpers = require('./../modules/helpers')

exports.getUsers = function(req, res, next) {
	db.getUsers(req.body)
		.then(function(result){
			res.status(200).send(result)
		})
}

/* ----------------------methods---------------------- */

/* ----------------------methods---------------------- */