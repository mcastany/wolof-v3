'use strict';

angular.module('wolofApp').controller('NavigationCtrl', ['$scope', '$stateParams', '$location', '$rootScope', 'projectFactory', function ($scope, $stateParams, $location, $rootScope, projectFactory) {
  $rootScope.selected = false;
  
  $scope.$on('$stateChangeSuccess', function() {
    var splitedUrl = $location.path().split('/');

    if (splitedUrl.length === 4) {
      console.log('Route: ' + $scope.route);
      $scope.route = splitedUrl[splitedUrl.length -1].toLowerCase();
    } else if (splitedUrl.length === 5) {
      console.log('Route: ' + $scope.route);
      $scope.route = splitedUrl[splitedUrl.length -2].toLowerCase();
    } else {
      console.log('Route: summary');
      $scope.route = 'summary';
    }
  });

  if ($stateParams.projectName){
    $rootScope.project = projectFactory.getByName($stateParams.projectName);
  }
}]);
