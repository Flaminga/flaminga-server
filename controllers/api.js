var secrets = require('../config/secrets');
var User = require('../models/User');
var _ = require('underscore');
var Twit = require('twit');
var twitter = require('twitter-text');
var moment = require('moment');

/**
 * GET /api
 * List of API examples.
 */

exports.getApi = function(req, res) {
  res.render('api/index', {
    title: 'API Browser'
  });
};

/**
 * GET /api/twitter
 * Twiter API example.
 */

exports.getTwitter = function(req, res, next) {
  var token = _.findWhere(req.user.tokens, { kind: 'twitter' });
  var T = new Twit({
    consumer_key: secrets.twitter.consumerKey,
    consumer_secret: secrets.twitter.consumerSecret,
    access_token: token.accessToken,
    access_token_secret: token.tokenSecret
  });
  T.get('search/tweets', { q: 'hackathon since:2013-01-01', geocode: '40.71448,-74.00598,5mi', count: 50 }, function(err, reply) {
    if (err) return next(err);
    res.render('api/twitter', {
      title: 'Twitter API',
      tweets: reply.statuses
    });
  });
};


exports.mentions = function(req, res, next) {
  var T = new Twit({
    consumer_key: secrets.twitter.consumerKey,
    consumer_secret: secrets.twitter.consumerSecret,
    access_token: req.user.accessToken,
    access_token_secret: req.user.tokenSecret
  });
  T.get('statuses/mentions_timeline', function(err, reply) {
    if (err) return next(err);
    var filtered = reply;
    if (req.user && req.user.filterAge) {
      var filterByAge = tweetAuthorOldEnough.bind(undefined, req.user.filterAge);
      filtered = reply.filter(filterByAge);
    }
    rendered = filtered.map(addRenderedTweetText);

    req.user.getList().success(function(result){
      result.getEntries().success(function(entries){
        var filterByListFunction = filterByUsers.bind(undefined, entries);
        var filteredByUser = rendered.filter(filterByListFunction);
    
        res.render('api/mentions', {
          title: 'Your filtered mentions',
          tweets: filteredByUser
        });
      })
    });
  });
}

function filterByUsers(entries, tweet) {
  for (var i=0; i < entries.length; i++) {
    console.log(entries[i].twitterId);
    console.log(tweet['user']['id_str']);
    if (tweet['user']['id_str'] == entries[i].twitterId) {
      return false;
    }
  }
  return true;
}

function addRenderedTweetText(tweet) {
  tweet['rendered_text'] = twitter.autoLink(twitter.htmlEscape(tweet['text']));
  tweet['rendered_time'] = moment(tweet['created_at']).fromNow();  
  return tweet;
}

function tweetAuthorOldEnough(daysOld, tweet) {
  var created = tweet['user']['created_at'];
  var created_date = new Date(created);
    
  if ((new Date().getTime() - created_date.getTime()) > (1000 * 60 * 60 * 24 * daysOld)) {
    return true;
  }
  return false;
}

exports.home = function(req, res, next) {
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
