var mongoose = require('mongoose');

var Iteration = mongoose.model('Iteration', mongoose.Schema({
    projectId: Number,
    number: Number,
    from: Date, 
    to:Date, 
    note: String, 
    features: [{
      id: mongoose.Schema.Types.ObjectId, 
      name: String,
      status: String
    }],
}));

exports = module.exports = {
    model: Iteration,
};


/*
var iterations = [
  { projectId: 1, number: 1, from: new Date(2013, 11, 4), to: new Date(2013, 11, 8), note: '1 Holiday', features: [{ id: 1, name: 'feature-1', status: 'completed'}, { id: 2, name: 'feature-6', status: 'completed'}] },
  { projectId: 1, number: 2, from: new Date(2013, 11, 11), to: new Date(2013, 11, 15), features: [{ id: 1,  name: 'feature-2', status: 'completed'}] },
  { projectId: 1, number: 3, from: new Date(2013, 11, 18), to: new Date(2013, 11, 22), features: [{ id: 1, name: 'feature-3', status: 'progress'}, { id: 2, name: 'feature-7', status: 'blocked'}, { id:3,  name: 'feature-10', status: 'pending'}] },
  { projectId: 1, number: 4, from: new Date(2013, 11, 25), to: new Date(2013, 11, 11), features: [{ id: 1, name: 'feature-4', status: 'pending'}] },
  { projectId: 1, number: 5, from: new Date(2013, 12, 2), to: new Date(2013, 12, 7), features: [{ id: 1, name: 'feature-5', status: 'pending'},{ id: 2, name: 'feature-8', status: 'pending'},{ id: 3, name: 'feature-9', status: 'pending'}] }];

*/