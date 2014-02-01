var Twit = require('twit')
var T = new Twit({  
    consumer_key:         '@@'  // your Twitter app's consumer key and secret
  , consumer_secret:      '@@'
  , access_token:         '@@'  // for testing purposes, create an access_token for your app for a single user; copy and paste that token and secret here
  , access_token_secret:  '@@'
});
// create an app: https://dev.twitter.com/apps
// for the app, click: "Create my access token"

// get the user's mentions
T.get('statuses/mentions_timeline', function(err, reply) {
  for (var i=0; i < reply.length; i++) {
    //console.log(reply[i]['text']);
    console.log(reply[i]['user']['created_at']);
    console.log("Too young: " + tweetAuthorTooYoung(reply[i]));
  }
});

function tweetAuthorTooYoung(tweet) {
  var created = tweet['user']['created_at'];
  var created_date = new Date(created);
  
  var daysOld = 90; // TODO: configurable somewhere
  
  if ((new Date().getTime() - created_date.getTime()) > (1000 * 60 * 60 * 24 * daysOld)) {
    return false;
  }
  return true;
}