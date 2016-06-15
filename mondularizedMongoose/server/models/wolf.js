var mongoose = require('mongoose')
var WolfSchema = mongoose.Schema({
  name: {type: String, required: true },
  color: {type: String, required: true },
  owner: {type: String, required: true}
}, { timestamps: true});

var Wolf = mongoose.model('Wolf', WolfSchema);
