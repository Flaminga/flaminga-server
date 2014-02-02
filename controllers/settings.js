/**
 * GET /
 * settings page.
 */

exports.getSettings = function(req, res) {
  res.render('settings', {
    title: 'Settings',
    filterAge: req.user.filterAge,
    filterAgeOptions: [
      {description: "any age", days: 0},
      {description: "at least 1 month old", days: 30},
      {description: "at least 3 months old", days: 90},
      {description: "at least 6 months old", days: 180},
      {description: "at least 1 year old", days: 365}
    ]
  });
};
