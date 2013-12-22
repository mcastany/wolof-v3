'use strict';

angular.module('wolofApp').controller('BacklogCtrl', ['$scope', '$stateParams', '$rootScope', 'projectFactory', 'storyFactory', function ($scope, $stateParams, $rootScope, projectFactory, storyFactory) {
  $scope.route = 'backlog';

  if ($stateParams.iterationNumber && angular.isNumber( parseInt($stateParams.iterationNumber))) {
    $scope.stories = storyFactory.getByProjectAndIteration($rootScope.project.id,  parseInt($stateParams.iterationNumber));
  } else {
    $scope.stories = storyFactory.getAllByProject($rootScope.project.id);
  }
}]);
