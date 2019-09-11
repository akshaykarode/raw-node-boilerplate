var Connection = require('./connection'),
    forEach = require('async-foreach').forEach;
    Q = require('q');

function Database(dbConfig) {
  this.connection = new Connection(dbConfig)
  /* Initiating Globals */
  this._USERS=[]
  // this.getUsers().then(function(result){
  //   console.log("All Globals Initiated Successfully.")
  //   this._USERS=result
  // }.bind(this),function(err){
  //   console.log("Initiating Globals Failed !",err)
  // })
  /* Initiating Globals End */
  return this;
}
/* ----------------- USERS ----------------- */
Database.prototype.getUsers = function(obj) {
  var deferred = Q.defer();
  var query = 'SELECT * FROM users'
  this.connection.acquire(function(err, con) {
    con.query(query, function(err, result) {
      con.release();
      deferred.resolve(result)
    });
  });
  return deferred.promise;
};
module.exports = Database;
