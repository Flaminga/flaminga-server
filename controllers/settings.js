/**
 * GET /
 * settings page.
 */

exports.getSettings = function(req, res) {
  res.render('settings', {
    title: 'Settings'
  });
};
