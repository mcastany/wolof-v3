'use strict';

angular.module('wolofApp').controller('DeliverymapCtrl', ['$scope', '$routeParams', 'projectFactory', 'iterationFactory', '$location', '$rootScope', function ($scope, $routeParams, projectFactory, iterationFactory, $location, $rootScope) {
  $scope.enableRemove = false;
  $scope.iterationNumber = $routeParams.iterationNumber || -1;
  $scope.iterations = iterationFactory.getAll();

  $scope.navigateToBacklog = function(iterationNumber) {
    $location.path('/wolof/:projectName/backlog/:iterationNumber'.replace(':projectName', $rootScope.project.name).replace(':iterationNumber', iterationNumber));
  };

  $scope.addIteration = function(from, to){
    iterationFactory.addIteration(from, to);
  };

  $scope.addFeature = function(iterationNumber){
    iterationFactory.addFeature(iterationNumber, 'New Feature');
  };

  $scope.removeFeature = function(iterationNumber, feature) {
    iterationFactory.removeFeature(iterationNumber, feature);
  };
}]);
