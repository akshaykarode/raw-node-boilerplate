const Sequelize = require('sequelize');

module.exports = function(dbname,dbconfig){
    const sequelize = new Sequelize(dbconfig.connectionURI,{
        dialect: dbconfig.dialect,
        logging: false,
        pool: dbconfig.pool
    });
    sequelize.authenticate()
        .then(() => {
            console.log(dbname+' : Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database: ',dbname);
            console.error(err);
        });
    return sequelize;
};

/* ------------------- fn ------------------- */