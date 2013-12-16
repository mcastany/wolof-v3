'use strict';

angular.module('wolofApp').controller('NavigationCtrl', ['$scope', '$routeParams', '$location', '$rootScope', 'projectFactory', function ($scope, $routeParams, $location, $rootScope, projectFactory) {
  $rootScope.selected = false;
  $scope.$on('$routeChangeSuccess', function () {
    var splitedUrl = $location.path().split('/');

    if (splitedUrl.length === 4) {
      $scope.route = splitedUrl[splitedUrl.length -1].toLowerCase();
    } else if (splitedUrl.length === 5) {
      $scope.route = splitedUrl[splitedUrl.length -2].toLowerCase();
    } else {
      $scope.route = 'summary';
    }

    $rootScope.project = projectFactory.getByName($routeParams.projectName);
    $rootScope.selected =  $routeParams.projectName ? true : false;
  });

  $scope.selectProject = function () {
    $rootScope.selected = true;
  };
}]);
