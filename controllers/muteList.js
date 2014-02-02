/**
 * GET /
 * muteList page.
 */

exports.index = function(req, res) {
  res.render('muteList', {
    title: 'Muted List'
  });
};