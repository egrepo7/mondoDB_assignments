var mongoose = require('mongoose')
var peopleSchema = mongoose.Schema({
  name: {type: String, required: true}
}, { timestamps: true })

var people = mongoose.model('People', peopleSchema)
