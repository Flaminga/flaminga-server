/**
 * GET /
 * muteList page.
 */

exports.getMuteList = function(req, res) {
  req.user.getList().success(function(result){
    result.getEntries().success(function(entries){
      res.render('mutelist', {
        title: 'Mute List',
        mutelist: entries
      });
      console.log(entries);
    });
  });
};