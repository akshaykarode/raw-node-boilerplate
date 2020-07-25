'use strict';

const fs = require('fs');
const path = require('path');
const db = {};
const SequelizeInstance = require(path.join(global.basedir, 'modules', 'comman', 'sequelize-instance')); /* global global.config, global.basedir */
const sequelize = new SequelizeInstance('db_migration', global.config.databases.db_migration);
fs
    .readdirSync(__dirname)
    .filter((file) => {
      return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach((file) => {
      const model = sequelize.import(path.join(__dirname, file));
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
