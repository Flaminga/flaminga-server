/**
 * GET /
 * muteList page.
 */

exports.getMuteList = function(req, res) {
  res.render('mutelist', {
    title: 'Mute List'
  });
};