var express = require('express')
var app = express();
var mongoose = require('mongoose');

require('./server/config/mongoose.js')

var routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.listen(2222, function() {
  console.log('****2222****')
})
