
var Sequelize = require('sequelize-postgres').sequelize;
var SequelizeStore = require('connect-session-sequelize')(require('express'));

//var sequelize = new Sequelize("postgres://thesmyth@localhost/flaminga", {
//    dialect: 'postgres'
//});
var sequelize = new Sequelize('flaminga', 'thesmyth', "pass", {
    host: 'localhost',
    dialect: 'postgres'
});

var User = sequelize.define('user', {
    name: Sequelize.STRING,
    accessToken: Sequelize.STRING,
    tokenSecret: Sequelize.STRING
});

//sequelize.sync();

module.exports = {
    User: User,
    sequelize: sequelize,
    //sessionStore: new SequelizeStore({
    //    db: sequelize
    //})
};
