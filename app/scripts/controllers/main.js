'use strict';

angular.module('wolofApp').controller('MainCtrl', [ '$scope', 'projectFactory', function ($scope, projectFactory) {
  $scope.projects = [];
  projectFactory.getAll().then(function (data){	
    $scope.projects = data;
  })
}]);
