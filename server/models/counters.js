var mongoose = require('mongoose');
// Creates a new Mongoose Schema object
var Schema = mongoose.Schema;  

// Collection to hold counters/sequences for ids
var CountersSchema = new Schema({  
    _id: { type: String, required: true },  
    sequence: { type: Number, required: true }
  },{ 
    versionKey: false 
  }
);

// Creates the Model for the Attachments Schema
var Counters = mongoose.model('Counters', CountersSchema);

var getNext = function(collection, callback) {
  var query = {_id: collection};
  var update = {$inc: {sequence: 1}};
  var options = {upsert: true};
  Counters.findOneAndUpdate(query, update, options, function(err, counter) {
    if (err) throw err;
    console.log(counter.sequence);
    callback(counter.sequence);
  });
}

exports = module.exports = {
  getNext: getNext
};