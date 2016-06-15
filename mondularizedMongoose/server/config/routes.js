var Wolf = require('../controllers/wolfs.js');

module.exports = function(app){
  app.get('/', function(req, res){
    Wolf.showindex(req, res)
  })
  app.get('/wolves/new', function(req, res){
    res.render('addWolf')
  })
  app.get('/wolves/:wolf_id/edit', function(req, res){
    Wolf.edit(req, res)
  })
  app.post('/wolves/:wolf_id', function(req, res){
    Wolf.update(req, res)
  })
  app.post('/wolves', function(req, res){
    Wolf.addWolf(req,res)
  })
  app.get('/wolves/:wolf_id', function(req, res){
    Wolf.showWolf(req,res)
  })
  app.get('/wolves/:wolf_id/destroy', function(req, res){
    Wolf.delete(req, res)
  })
}
