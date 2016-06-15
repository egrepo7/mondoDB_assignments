var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/client/views'));
app.use(express.static(__dirname + '/client/static'));
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quoting_dojo');

var QuoteSchema = mongoose.Schema({
  name: {type: String, required: true, min: 2},
  quote: {type: String, required: true, min: 2},
}, { timestamps: true });

mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');

app.get('/', function(req, res) {
  console.log('in root route!');
  res.render('index')
});

app.get('/skip', function(req, res) {
  console.log('skipping to quote page!')
  Quote.find({}, function(err, quotes) {
    if(err){
      res.json(err)
    } else {
      console.log(quotes);
      res.render('quotes', {quotes : quotes});
    }
  })
})

app.post('/quote', function(req, res) {
  console.log('quote recieved', req.body);
  var quote = new Quote(req.body);
  quote.save(function(err){
    if(err){
      res.json(err);
    }
    else {
      res.redirect('/');
    }
  });
});

app.listen(1234, function() {
  console.log('****1234****');
});
