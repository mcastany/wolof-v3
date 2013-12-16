'use strict';

angular.module('wolofApp').factory('iterationFactory', function () {
  var iterations = [
      { number: 1, from: new Date(2013, 11, 4), to: new Date(2013, 11, 8), note: '1 Holiday', features: [{ name: 'feature-1', status: 'completed'}, { name: 'feature-6', status: 'completed'}] },
      { number: 2, from: new Date(2013, 11, 11), to: new Date(2013, 11, 15), features: [{ name: 'feature-2', status: 'completed'}] },
      { number: 3, from: new Date(2013, 11, 18), to: new Date(2013, 11, 22), features: [{ name: 'feature-3', status: 'progress'}, { name: 'feature-7', status: 'blocked'}, { name: 'feature-9', status: 'pending'}] },
      { number: 4, from: new Date(2013, 11, 25), to: new Date(2013, 11, 11), features: [{ name: 'feature-4', status: 'pending'}] },
      { number: 5, from: new Date(2013, 12, 2), to: new Date(2013, 12, 7), features: [{ name: 'feature-5', status: 'pending'},{ name: 'feature-8', status: 'pending'},{ name: 'feature-9', status: 'pending'}] }
    ];

  var getAll = function () {
    return iterations;
  };

  var get = function(number) {
    for (var i = iterations.length - 1; i >= 0; i--) {
      if (iterations[i].number === number){
        return iterations[i];
      }
    }
    return null;
  };

  var addIteration = function(from, to) {
    var lastIteration = iterations[iterations.length - 1];

    iterations.push({
      number: lastIteration.number + 1,
      from : from || new Date(lastIteration.from.getFullYear(),lastIteration.from.getMonth(), lastIteration.from.getDate() + 7),
      to: to || new Date(lastIteration.to.getFullYear(),lastIteration.to.getMonth(), lastIteration.to.getDate() + 7),
      features: []
    });
  };

  var addFeature = function(iterationNumber, feature, status) {
    var iteration = get(iterationNumber);

    iteration.features.push({
      name: feature,
      status : status || 'pending'
    });
  };

  var removeIteration = function(element){
    var index = iterations.indexOf(element);
    if (index > -1) {
      iterations.splice(index, 1);
    }
  };

  var removeFeature = function(iterationNumber, feature){
    var iteration = get(iterationNumber);
    var index = iteration.features.indexOf(feature);
    if (index > -1) {
      iteration.features.splice(index, 1);
    }
  };

  // Public API here
  return {
    getAll: getAll,
    get: get,
    addIteration: addIteration,
    addFeature: addFeature,
    removeIteration: removeIteration,
    removeFeature: removeFeature
  };
});
