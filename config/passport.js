var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var OAuthStrategy = require('passport-oauth').OAuthStrategy;
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var secrets = require('./secrets');
var _ = require('underscore');

var db = require('./db');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(req, id, done) {
    db.User.find(id).success(function(user){
        done(null, user);
    }).failure(function(err){
        done(err, null);
    });
});

/**
 * Sign in with Twitter.
 */

passport.use(new TwitterStrategy(secrets.twitter, function(req, accessToken, tokenSecret, profile, done) {
  db.User.find({where: {name: profile.id}}, function(err, results){
    if (err) return done(err);

    var existingUser = results[0];

    if (existingUser){
        done(null, existingUser);
    } else {
        db.User.create({
            name: profile.id,
            accessToken: accessToken,
            tokenSecret: tokenSecret
        }).success(function(user){
            done(null, user);
        }).failure(function(err){
            done(err, null);
        });
    }
  });
}));

exports.isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
};

exports.isAuthorized = function(req, res, next) {
  var provider = req.path.split('/').slice(-1)[0];
  if (_.findWhere(req.user.tokens, { kind: provider })) next();
  else res.redirect('/auth/' + provider);
};
