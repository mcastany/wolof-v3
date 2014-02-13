'use strict';

angular.module('wolofApp').factory('iterationFactory', [ '$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
  var getAll = function (project) {
    var d = $q.defer();
    $http.get('/api/project/' + project + '/iteration' ).
      success(function(data) {
        d.resolve(data);
      });
    return d.promise;
  };

  var get = function(project, number) {
    var d = $q.defer();
    $http.get('/api/project/' + project + '/iteration/' + number ).
      success(function(data) {
        d.resolve(data);
      });
    return d.promise;
  };

  var addIteration = function(project, from, to) {
    var d = $q.defer();
    var data = {
      from: from,
      to: to,
      note: ''
    };

    $http.post('/api/project/' + project + '/iteration', data).
      success(function(data) {
        d.resolve(data);
      }).error(function(e){
        console.log(e)
      });
    
    return d.promise;
  };

  var addFeature = function(project, iterationNumber, feature, status) {
    var d = $q.defer();
    var data = {
      name: feature,
      status: status || "pending"
    };

    $http.post('/api/project/' + project + '/iteration/' + iterationNumber + '/feature', data).
      success(function(data) {
        d.resolve(data);
      }).error(function(e){
        console.log(e)
      });

    return d.promise;
  };

  var removeIteration = function(project, element){
    var d = $q.defer();
    $http.delete('/api/project/' + project + '/iteration/' +  element.id).
      success(function(data) {
        d.resolve(data);
      }).
      error(function(data, status) {
        console.log(status);
        d.resolve(data);
      });
    return d.promise;
  };

  var removeFeature = function(project, iterationNumber, feature){
    var d = $q.defer();
    $http.delete('/api/project/' + project + '/iteration/' + iterationNumber + '/feature/' + feature.id).
      success(function(data) {
        d.resolve(data);
      }).
      error(function(data, status) {
        console.log(status);
        d.resolve(data);
      });
    return d.promise;
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
}]);
