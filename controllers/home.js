var secrets = require('../config/secrets');
var User = require('../models/User');
var _ = require('underscore');
var Twit = require('twit');

/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
  if (req.isAuthenticated()){
    var T = new Twit({
      consumer_key: secrets.twitter.consumerKey,
      consumer_secret: secrets.twitter.consumerSecret,
      access_token: req.user.accessToken,
      access_token_secret: req.user.tokenSecret
    });
    T.get('statuses/home_timeline', function(err, reply) {
      if (err) return next(err);
        res.render('api/mentions', {
        title: 'Twitter API',
        tweets: reply
      });
    });
  }
  else{
    res.render('home', {
      title: 'Home'
    });
  }
};
