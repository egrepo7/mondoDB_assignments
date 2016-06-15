var mongoose = require('mongoose');
var Wolf = mongoose.model('Wolf')
module.exports = {
  showindex: function(req, res){
    Wolf.find({}, function(err, myWolves){
      res.render('index', {myWolves:myWolves});
    })
  },
  showWolf: function(req, res){
    Wolf.findOne({_id: req.params.wolf_id}, function(err, wolf){
      res.render('wolfpage', {wolf:wolf})
    })
  },
  edit: function(req, res){
    Wolf.find({_id: req.params.wolf_id}, function(err, wolf){
      res.render('editWolf', {wolf:wolf});
    })
  },
  update: function(req, res){
    Wolf.update({_id: req.params.wolf_id}, {name:req.body.name, color: req.body.color, owner: req.body.name}, function(err){
      res.redirect('/');
    })
  },
  addWolf: function(req, res){
    var newWolf = new Wolf(req.body);
    newWolf.save(function(err){
      res.redirect('/')
    })
  },
  delete: function(req, res){
    Wolf.remove({_id: req.params.wolf_id}, function(err){
      res.redirect('/')
    })
  }
}
