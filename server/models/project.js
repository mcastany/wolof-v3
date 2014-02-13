var mongoose = require('mongoose');

var ProjectSchema = mongoose.model('Project', mongoose.Schema({
    id : { type: Number, required: true },
    name : { type: String, required: true },
    lowerCaseName  : { type: String, required: true },
    friendlyName : String,
    iterations : Number,
    startDate : Date,
    endDate : Date,
    team : Array
}));

exports = module.exports = {
    model: ProjectSchema
};