'use strict';

angular.module('wolofApp').factory('projectFactory', function () {
  var projects = [{
    id : 1,
    name : 'Grays',
    friendlyName : 'Windows Azure Training Kit',
    iterations : 10,
    startDate : new Date(2013, 11, 8),
    endDate : new Date(2013, 12, 10),
    team : [
      { name: 'Marcos Castany' },
      { name: 'Hernan Meydac' },
      { name: 'Gabriel Iglesias' },
      { name: 'Nicolas Bello' }
    ]
  }];

  var getAll = function () {
    return projects;
  };

  var get = function(id) {
    for (var i = projects.length - 1; i >= 0; i--) {
      if (projects[i].id === id){
        return projects[i];
      }
    }
    return null;
  };

  var getByName = function (name) {
    for (var i = projects.length - 1; i >= 0; i--) {
      if (projects[i].name.toLowerCase() === name.toLowerCase()){
        return projects[i];
      }
    }
    return null;
  };
  
  var add = function(element){
    projects.push(element);
  };

  var remove = function(element){
    var index = projects.indexOf(element);
    if (index > -1) {
      projects.splice(index, 1);
    }
  };
  // Public API here
  return {
    getAll: getAll,
    get: get,
    getByName: getByName,
    add: add,
    remove: remove
  };
});
