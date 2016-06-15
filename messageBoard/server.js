//////////////////////////
///// SETUP OUR APP //////
//////////////////////////

// we use express to make our lives easy
var express = require('express')
// use express to make an app that will make our lives easier
var app = express();
// other dependencies
// we use bodyparser to extract information out of forms
var bodyParser = require('body-parser');
// allow multiple computers to use directory names without issue
var path = require('path');

//////////////////////////
/// APP configuration ////
//////////////////////////

// sets up each file we render to have the .ejs extension(embeddedJS)
app.set('view engine', 'ejs');
// Where are our views at? In a folder named 'client'
app.set('views', path.join(__dirname, '/client/views'));
//set up static content for user
app.use(express.static(__dirname + '/client/static'));
// use body parser to extract info out of our forms
app.use(bodyParser.urlencoded({extended:true}));

//////////////////////////
/////// Models   /////////
//////////////////////////

// configure and setup mongoose
var mongoose = require('mongoose');

// connect to our mongo db called 'my_messageBoard'
mongoose.connect('mongodb://localhost/my_messageBoard');

// set up our schemas
var MessageSchema = mongoose.Schema({
  name: {type: String, required: true, min: 2},
  message: {type: String, required: true, min: 2, max: 255},
  _comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
}, { timestamps: true }); Aic

// register our schema
mongoose.model('Message', MessageSchema)

var CommentSchema = mongoose.Schema({
  name: {type: String, required: true, min: 2},
  comment: {type: String, required: true, min: 2, max: 255},
  _message: {type: mongoose.Schema.Types.ObjectId, ref: 'Message'}
}, { timestamps: true });

//register our Schema
mongoose.model('Comment', CommentSchema);

// retrieve those Models
var Message = mongoose.model('Message');
var Comment = mongoose.model('Comment');

//////////////////////////////////
//// Routes & Controller Logic ///
//////////////////////////////////
app.get('/', function(req, res) {
  console.log('in root route!');
  Message.find({}).populate('_comments').exec(function(err, messages) {
    // if error we throw them at the user
    if(err){
      res.json(err)
    } else {
      // else we want to display messages on the page
      console.log(messages);
      // we pass our messages to the view
      res.render('index', {messages:messages});
    }
  })
});

app.post('/create_message', function(req, res) {
  // take in a req with the form fileld out
  console.log('message received', req.body);
  // put our info into the blueprint of what a message should be
  var message = new Message(req.body);
  // save that message at this point
  message.save(function(err){
    //if there is an error we render json information
    if(err){
      res.json(err);
    }
    else {
      res.redirect('/');
    }
  })
});

app.post('/create_comment/:message_id', function(req, res){
  console.log(req.params)
  // -------------------- step 1
  // Lets find the message based on the information in our url
  Message.findOne({_id: req.params.message_id}, function(err, message){
    if(err){
      res.json(err)
    }
    else{
      // console.log(message)
      // ---------------- step 2
      // create the instance of the new Comment
      var new_comment = new Comment(req.body)
      // ----------------- step 3
      // attach parent object to the Comment
      new_comment._message = message._id
      // ----------------- step 4
      // save the new comment!
      new_comment.save(function(err) {
        if(err){
          res.json(err)
        }else{
          // ------------  step 5
          // update the message with the comment id
          message._comments.push(new_comment._id)
          // ------------ step 6
          // save the updated message!
          message.save(function(err){
            if(err){
              res.json(err)
            }else {
              // -------------step 7
              // get the hell outta here
              res.redirect('/')
            }
          })
        }
      })
    }
  })
});

///////////////////////////
////// START SERVER ///////
///////////////////////////
app.listen(4444, function() {
  console.log('****4444****');
});
