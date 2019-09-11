const express = require("express")
const router = express.Router()
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const hostname = process.env.HOSTNAME || 'localhost'
const publicDir = __dirname + '/public'
const _config = require('./configs/default.json')

const Logger = require('./modules/infra/logger')
// var DB = require('./modules/db')
// Global
config = _config[process.env.NODE_ENV] || _config['development'];
app.locals.env=config;
// db = new DB(config.db)
// Global Ends

/* -------- App Configs --------  */
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('port', (process.env.PORT || 4000))

app.use(function(req, res, next) { // CORS Enable
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'x-access-token,Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
})
app.use(methodOverride());
app.use(bodyParser.json({
    limit: '100mb'
}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '100mb'
}));
// app.use();
app.use(express.static(publicDir));

app.use(Logger(config))
/* --------  App Configs Ends --------  */

/* --------  Routes --------  */
require('./modules/routes.js')(router)
app.use(router)
/* --------  Routes Ends --------  */
console.log("Server is listening at http://%s:%s", hostname, app.get('port') , " ENV:",config.envName);
app.listen(app.get('port'), hostname);
