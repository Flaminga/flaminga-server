/**
 * GET /
 * muteList page.
 */

exports.getMuteList = function(req, res) {
  req.user.getList().success(function(mutelist){
  res.render('mutelist', {
    title: 'Mute List',
    mutelist: []
  });
    console.log(mutelist);
  });
};