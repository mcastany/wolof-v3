var mongoose = require('mongoose');

var StorySchema = mongoose.model('Story', mongoose.Schema({
    name: { type: String, required: true }, 
    lowerCaseName  : { type: String, required: true },
    points: {type: Number, default: 0}, 
    tags: Array, 
    iteration : Number, 
    projectId : Number, 
    id : Number, 
    status: String
}));

exports = module.exports = {
    model: StorySchema
};