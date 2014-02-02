
var Sequelize = require('sequelize-postgres').sequelize;
var SequelizeStore = require('connect-session-sequelize')(require('express'));

 if (process.env.HEROKU_POSTGRESQL_MAROON_URL) {
    // the application is executed on Heroku ... use the postgres database
    var sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_MAROON_URL)
 } else {
    // the application is executed on non-heroku ... use sequelize   
    var sequelize = new Sequelize('flaminga', null, null, {
        host: 'localhost',
        dialect: 'postgres',
        protocol: 'postgres',
        port: 5432 
    });
}
var User = sequelize.define('user', {
    name: Sequelize.STRING,
    accessToken: Sequelize.STRING,
    tokenSecret: Sequelize.STRING
});

var MuteList = sequelize.define('mutelist', {
});
User.hasOne(MuteList, {as: "List"});

var MuteListEntry = sequelize.define('mutelistentry', {
    twitterId: Sequelize.STRING
});
MuteList.hasMany(MuteListEntry);

User.hasMany(MuteList, {as: "Subscription"});
//MuteList.hasMany(User);

// TODO At some point we should wait for the DB connection to load.

module.exports = {
    User: User,
    MuteList: MuteList,
    MuteListEntry: MuteListEntry,
    sequelize: sequelize,
    sessionStore: new SequelizeStore({
        db: sequelize
    })
};

var recreateDB = false;

sequelize.sync({force: recreateDB}).failure(function(err){
    console.log(err);
});
