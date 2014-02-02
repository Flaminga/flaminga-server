var db = require('../config/db');


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
   //   console.log(entries);
    });
  });
};


// Testing: $.ajax({method: 'post', url: '/mutelist/add-entry', data: 'id=2134535'})
exports.addEntry = function(req, res){
    req.user.getList().success(function(list){
        db.MuteListEntry.create({
            twitterId: req.body.id,
            screenName: req.body.screenName
        }).success(function(entry){
            list.addEntry(entry).success(function(){
                res.redirect('/mutelist');
            });
        });
    });
};