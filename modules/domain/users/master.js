var Q = require('q')

function Master(){
  return this
}

/* --- API Methods ---
GET  - Users
*/

Master.prototype.Users = function(query){
	var deferred = Q.defer();
	var url = "www.soruce.com/users?"+query;
	request.get(url)
		.then(function(xmlResponse){
			deferred.resolve(xmlResponse)
		},function(error){
			deferred.reject(error)
		})
	return deferred.promise;
}

module.exports = Master;