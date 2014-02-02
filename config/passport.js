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

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(req, id, done) {
    req.models.user.get(id, function(err, user){
        done(err, user);
    });
});

/**
 * Sign in with Twitter.
 */

passport.use(new TwitterStrategy(secrets.twitter, function(req, accessToken, tokenSecret, profile, done) {
  req.models.user.find({name: profile.id}, function(err, results){
    if (err) return done(err);

    var existingUser = results[0];

    if (existingUser){
        done(null, existingUser);
    } else {
        req.models.user.create([{
            name: profile.id,
            accessToken: accessToken,
            tokenSecret: tokenSecret
        }], function(err, users){
            if (err) return done(err, null);

            done(null, users[0]);
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
