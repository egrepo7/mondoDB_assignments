// require express and path
var express = require('express');
var path = require('path');
// create the express app
var app = express();
// require bodyParserto handle post data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// load static content
app.use(express.static(__dirname + '/client/static'));
// setup ejs and views folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/client/views'));

//require the mongoose configuration file which does the rest for us
require('./server/config/mongoose.js');
// store the function in a variable
var routes_setter = require('./server/config/routes.js');
// invoke the function stored in routes_setter and pass the "app" variable
routes_setter(app);
// tell the express ap to listen for port
app.listen(1234, function() {
  console.log('****1234****');
});
