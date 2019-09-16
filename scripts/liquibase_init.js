const path = require('path');
const fs = require('fs');
const asyncforEach = require('async-foreach').forEach;
const liquibase = require('liquibase');

const __basedir = path.join(__dirname,'..')
const _config = require(path.join(__basedir,'configs','default.json'))
const config = _config[process.env.NODE_ENV] || _config['development'];
console.log('Environment : ', config.envName);

let databases = getDatabaseNames(config.databases)
console.log("Database List : " ,databases);

let failFlag=false
let command = 
	(process.env.LQ_OP=='UP')? 
		{cmd:'update',arg:undefined} : 
			(process.env.LQ_OP_COUNT)? 
				{cmd:'rollbackCount',arg:process.env.LQ_OP_COUNT} : {cmd:'rollbackCount',arg:1};
console.log("COMMAND : ",command)
console.log('LQIBASE OPERATION : ', process.env.LQ_OP);
console.log('LQIBASE OPERATION COUNT : ', command.arg);

asyncforEach(databases, function(dbName, index, arr) {
	var done = this.async();
	var changeLogPath=path.join(__basedir,'modules','infra','database','migration',dbName,'db.changelog-master.xml')
	console.log('ChangeLogPath : ',changeLogPath)
	if(fs.existsSync(changeLogPath)){
		console.log('===== Migrating : ',dbName,' =====')
	  liquibase({
	  	liquibase:path.join(__basedir,'modules','infra','database','migration','liquibase-core-3.5.3.jar'),
	  	classpath:path.join(__basedir,'modules','infra','database','migration','postgresql-42.2.8.jar'),
		  changeLogFile: changeLogPath,
		  url: config.liquibase_connection_uri+dbName,
		  username: config.databases[dbName].user,
		  password: config.databases[dbName].password
		})
		.run(command.cmd,command.arg)
		.then((success) => {
			console.log('===== Migrated : ',dbName,' =====')
			done()
		})
		.catch((err) => {
			failFlag=true
			console.log('fail', err)
			done()
		});
	}else{
		// console.log("No Migrations are available for database :",dbName)
		done()
	}

},function(final){
	if(failFlag===true){
		console.log("***** Something Went Wrong ! *****")
		console.log("***** Migration Script Failure ! *****");
		process.exit(1);
	}else{
		console.log("***** All operations executed successfully. :) *****")
	}
});

/* ------------------- fn ------------------- */
function getDatabaseNames(dbconfigs){
    return Object.keys(dbconfigs)
}