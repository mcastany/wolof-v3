var mongoose = require('mongoose');

var Feature = mongoose.model('Feature', mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId, 
    name: String, 
    status: String
}));

exports = module.exports = {
    model: Feature,
};