'use strict';

angular.module('wolofApp').controller('SodCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
	$scope.projectName = $routeParams.projectName;
   
}]);
