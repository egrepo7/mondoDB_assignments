//require mongoose
var mongoose = require('mongoose');

// create Schema
var QuoteSchema = mongoose.Schema({
  name: {type: String, required: true, min: 2},
  quote: {type: String, required: true, min: 2},
}, { timestamps: true });

//register the schema as a model
var Quote = mongoose.model('Quote', QuoteSchema);
