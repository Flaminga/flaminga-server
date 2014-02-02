
var Sequelize = require('sequelize-postgres').sequelize;
var SequelizeStore = require('connect-session-sequelize')(require('express'));

var sequelize = new Sequelize('flaminga', 'thesmyth', "pass", {
    host: 'localhost',
    dialect: 'postgres',
    protocol: 'postgres',
    port: 5432
});

var User = sequelize.define('user', {
    name: Sequelize.STRING,
    accessToken: Sequelize.STRING,
    tokenSecret: Sequelize.STRING
});

User.sync({force: true}).failure(function(err){
    console.log(err);
});

// TODO At some point we should wait for the DB connection to load.

module.exports = {
    User: User,
    sequelize: sequelize,
    sessionStore: new SequelizeStore({
        db: sequelize
    })
};
