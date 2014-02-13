'use strict';

angular.module('wolofApp').controller('CreateCtrl', ['$scope', 'projectFactory', '$location', function ($scope, projectFactory, $location) {
	$scope.addProject = function(){
		projectFactory.add($scope.project).then(function (){
		     $location.path('/');  
		});
	};
}]);
