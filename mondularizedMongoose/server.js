var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'client/views'));
app.use(express.static(__dirname + '/client/static'));
app.use(bodyParser.urlencoded({ extended: true }));

require('./server/config/mongoose.js')

var routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.listen(1111, function() {
  console.log('****1111****');
});
