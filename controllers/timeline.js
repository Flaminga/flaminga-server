/**
 * GET /
 * Twitter timeline
 */

exports.timeline = function(req, res) {
  res.render('timeline', {
    title: 'Twitter Timeline',
    feed:[{
      author: '#link-to-twitter-profile',
      screenname: 'konklone',
      name: 'Eric Mill',
      tweettext: 'i&#39;m writing a book of essays about web pages. i&#39;ll ping you to set up a call!',
      avatar: 'https://si0.twimg.com/profile_background_images/378800000068059714/61a35f1700171d2eeb06d94526930818.png',
      permalink: 'permalinkhere',
      mentions:[{username: 'npdoty', tweeturl:'https://twitter.com/npdoty'},
          {username: 'npdoty', tweeturl:'https://twitter.com/npdoty'}]
    },
    {
      author: '#link-to-twitter-profile',
      screenname: 'ftrain',
      name: 'Paul Ford',
      tweettext: 'i&#39;m writing a book of essays about web pages. i&#39;ll ping you to set up a call!',
      avatar: 'https://si0.twimg.com/profile_background_images/378800000068059714/61a35f1700171d2eeb06d94526930818.png',
      permalink: 'permalinkhere',
      mentions:[{username: 'npdoty', tweeturl:'https://twitter.com/npdoty'},
          {username: 'npdoty', tweeturl:'https://twitter.com/npdoty'}]
    }]
  });
};