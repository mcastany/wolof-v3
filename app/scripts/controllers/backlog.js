'use strict';

angular.module('wolofApp').controller('BacklogCtrl', ['$scope', '$routeParams', '$rootScope', 'projectFactory', 'storyFactory', function ($scope, $routeParams, $rootScope, projectFactory, storyFactory) {
  if ($routeParams.iterationNumber && angular.isNumber( parseInt($routeParams.iterationNumber))) {
    $scope.stories = storyFactory.getByProjectAndIteration($rootScope.project.id,  parseInt($routeParams.iterationNumber));
  } else {
    $scope.stories = storyFactory.getAllByProject($rootScope.project.id);
  }

}]);
