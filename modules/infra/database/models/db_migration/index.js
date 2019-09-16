'use strict';

var fs = require('fs');
const path = require("path");
var db = {};
const SequelizeInstance = require(path.join(__basedir,'modules','comman','sequelize-instance'))
const sequelize = new SequelizeInstance('db_migration',config.databases.db_migration)
fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach((file) => {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = SequelizeInstance;

module.exports = db;