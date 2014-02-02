module.exports = function(db, models, next){
    models.user = db.define('user', {
        name: String,
        accessToken: String,
        tokenSecret: String
    });
    models.user.sync();

    return next();
};
