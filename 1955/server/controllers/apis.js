var mongoose = require('mongoose');
var people = mongoose.model('People')

module.exports = {
  index: function(req, res){
    people.find({}, function(err, carrots){
      if(err){
        res.json(err)
      }else{
        res.json(carrots)
      }
    })
  },
  add: function(req, res){
    console.log(req.params.name)
    var person = new people({name: req.params.name});
    person.save(function(err){
      if(err){
        console.log('error')
        res.json(err)
      }else{
        res.redirect('/')
      }
    })
  },
  remove: function(req, res){
    console.log(req.params)
    people.remove({name: req.params.name}, function(err){
      if(err){
        console.log('error')
        res.json(err)
      }else{
        res.redirect('/')
      }
    })
  },
  view: function(req, res){
    console.log(req.params)
    people.findOne({name: req.params.name}, function(err, person){
      if(err){
        res.json(err)
      }else{
        res.json(person)
      }
    })
  }
}
