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

exports.postSettings = function(req, res) {
  var postedAge = req.param('filterAge');
  
  req.user.updateAttributes({filterAge: parseInt(postedAge)}).success(function() {
    console.log('Successfully updated the filterAge.');
    res.render('settings', {
      title: 'Settings',
      filterAge: req.user.filterAge,
      filterAgeOptions: [
        {description: "any age", days: 0},
        {description: "at least 1 month old", days: 30},
        {description: "at least 3 months old", days: 90},
        {description: "at least 6 months old", days: 180},
        {description: "at least 1 year old", days: 365}
      ],
      success: true
    })
    }
  ).error(function(err) {
    res.render('settings', {
      title: 'Settings',
      filterAge: req.user.filterAge,
      filterAgeOptions: [
        {description: "any age", days: 0},
        {description: "at least 1 month old", days: 30},
        {description: "at least 3 months old", days: 90},
        {description: "at least 6 months old", days: 180},
        {description: "at least 1 year old", days: 365}
      ],
      error: err.toString()
    });
    
  });
  
};
