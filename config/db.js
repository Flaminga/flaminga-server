
var Sequelize = require('sequelize-postgres').sequelize;
var SequelizeStore = require('connect-session-sequelize')(require('express'));

var sequelize = new Sequelize('flaminga', null, null, {
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

var MuteList = sequelize.define('mutelist', {
});
MuteList.belongsTo(User);

var MuteListEntry = sequelize.define('mutelistentry', {
    twitterId: Sequelize.STRING
});
MuteList.hasMany(MuteListEntry);

User.hasMany(MuteList);
MuteList.hasMany(User);


sequelize.sync().failure(function(err){
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
