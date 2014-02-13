'use strict';

angular.module('wolofApp').factory('projectFactory', ['$http', '$q', function ($http, $q) {
  var getAll = function () {
    var d = $q.defer();
    $http.get('/api/projects').
      success(function(data) {
        d.resolve(data);
      });
    return d.promise;
  };

  var get = function(id) {
    var d = $q.defer();
    $http.get('/api/projects/' + id).
      success(function(data) {
        d.resolve(data);
      });
    return d.promise;
  };

  var getByName = function (name) {
    var d = $q.defer();
    $http.get('/api/projects/' + name ).
      success(function(data) {
        d.resolve(data);
      });
    return d.promise;
  };
  
  var add = function(element){
    var d = $q.defer();
    $http.post('/api/projects', element).
      success(function(data) {
        d.resolve(data);
      }).
      error(function(data, status) {
        console.log(status);
        d.resolve(data);
      });
    return d.promise;
  };

  var remove = function(element){
    var d = $q.defer();
    $http.delete('/api/projects/' + element.id).
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
    getByName: getByName,
    add: add,
    remove: remove
  };
}]);
