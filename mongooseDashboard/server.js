var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'client/views'));
app.use(express.static(__dirname + '/client/static'));
app.use(bodyParser.urlencoded({ extended: true }));


// data schemas //
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongooseDashboard');

var WolfSchema = mongoose.Schema({
  name: {type: String, required: true },
  color: {type: String, required: true },
  owner: {type: String, required: true}
}, { timestamps: true});

mongoose.model('Wolf', WolfSchema);
var Wolf = mongoose.model('Wolf')

// ROUTES //
// loads index page with all wolves
app.get('/', function(req, res) {
  console.log('in root route!');
  Wolf.find({}, function(err, myWolves) {
    if(err){
      res.json(err)
    }else{
      console.log(myWolves);
      res.render('index', {myWolves:myWolves});
    }
  })
})
// loads add new wolf page
app.get('/wolves/new', function(req, res) {
  console.log('in new wolf route!');
  res.render('addWolf')
})

// loads edit wolf page based on wolf._id
app.get('/wolves/:wolf_id/edit', function(req, res){
  console.log('in wolf edit page!')
  Wolf.find({_id: req.params.wolf_id}, function(err, wolf) {
    if(err) {
      res.json(err);
    }else{
      console.log(wolf);
      res.render('editWolf', {wolf:wolf});
    }
  })
})

// update wolf with info from edit page
app.post('/wolves/:wolf_id', function(req, res){
  console.log('wolf page updating')
  Wolf.update({_id: req.params.wolf_id},{ name:req.body.name, color:req.body.color, owner: req.body.name}, function(err){
    if(err){
      res.json(err);
    }else{
      res.redirect('/')
    }
  })
})

// saves new wolf data from add wolf form and redirects to index
app.post('/wolves', function(req, res) {
  console.log('new wolf added!');
  var newWolf = new Wolf(req.body);
  newWolf.save(function(err){
    if(err){
      res.json(err)
    }else{
      res.redirect('/')
    }
  })
})

// view individual wolf page
app.get('/wolves/:wolf_id', function(req, res){
  console.log('viewing individual wolf')
  Wolf.findOne({_id: req.params.wolf_id}, function(err, wolf){
    if(err){
      res.json(err)
    }else{
      res.render('wolfpage', {wolf:wolf})
    }
  })
})

// delete wolf
app.get('/wolves/:wolf_id/destroy', function(req, res) {
  console.log('wolf destroyed :(');
  Wolf.remove({_id:req.params.wolf_id}, function(err) {
    if(err){
      res.json(err)
    }else{
      res.redirect('/')
    }
  })
})

app.listen(1111, function() {
  console.log('****1111****');
});
