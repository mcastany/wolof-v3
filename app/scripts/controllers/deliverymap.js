'use strict';

angular.module('wolofApp').controller('DeliverymapCtrl', ['$scope', '$stateParams', 'projectFactory', '$location', '$rootScope', 'socketDeliveryMap', function ($scope, $stateParams, projectFactory, $location, $rootScope, socketDeliveryMap) {
    $scope.iterationNumber = $stateParams.iterationNumber || -1;
    
    socketDeliveryMap.getInitialData(function(data){
      $scope.iterations = data.iterations;  
    });

    socketDeliveryMap.onIterationCreated(function(data){
        $scope.iterations.push(data);
    });

    socketDeliveryMap.onIterationRemoved(function(data){
      var position = -1;
      for (var i = $scope.iterations.length - 1; i >= 0; i--) {
        if ($scope.iterations[i].number == data.number){
          position = i;
        }
      };
      if (position > -1)
        $scope.iterations.splice(position, 1);
    });

    socketDeliveryMap.onIterationEdited(function(data){
      for (var i = $scope.iterations.length - 1; i >= 0; i--) {
        if ($scope.iterations[i].number == data.number){
          $scope.iterations[i].from = data.from;
          $scope.iterations[i].to = data.to;
        }
      };
    });

    socketDeliveryMap.onFeatureCreated(function(data){
      var position = -1;
      for (var i = $scope.iterations.length - 1; i >= 0; i--) {
        if ($scope.iterations[i].number == data.number){
          position = i;
        }
      };
      
      if (position > -1){ 
        $scope.iterations[position].features = data.features;
      }
    });

    socketDeliveryMap.onFeatureRemoved(function(data){
      var position = -1;
      for (var i = $scope.iterations.length - 1; i >= 0; i--) {
        if ($scope.iterations[i].number ==  data.number){
          position = i;
        }
      };
      
      if (position > -1){ 
        $scope.iterations[position].features = data.features;
      }
    });

    socketDeliveryMap.onFeatureEdited(function(data){
      for (var i = $scope.iterations.length - 1; i >= 0; i--) {
        if ($scope.iterations[i].number == data.number){
            $scope.iterations[i].features = data.features;
             /*for (var j= $scope.iterations[i].features.length - 1; j >= 0; j--) {
              if ($scope.iterations[i].features[j].id == data.id) {
                $scope.iterations[i].features[j].name = data.name;
                $scope.iterations[i].features[j].status = data.status;
                break;
              };
             }*/
        }
      };
    });

    projectFactory.getByName($stateParams.projectName).then(function (project){
      $scope.project = project;
      socketDeliveryMap.connect(project);
    });
    

    $scope.addFeature = function(number, name){
      var status = "pending";
      socketDeliveryMap.addFeature($scope.project.id, number, name, status);
      for (var i = $scope.iterations.length - 1; i >= 0; i--) {
        if ($scope.iterations[i].number == number){
          $scope.iterations[i].features.push({name: name, status: status});
          break;
        }
      }
    };

    $scope.removeFeature = function(number, id){
      socketDeliveryMap.removeFeature($scope.project.id, number, id);
    };

    $scope.editFeature = function(number, id, name, status){
      socketDeliveryMap.editFeature($scope.project.id, number, id, name, status);
    };

    $scope.addIteration = function(){
      var number = 1;
      if ($scope.iterations.length != 0){
         number = $scope.iterations[$scope.iterations.length -1].number + 1
      }
      socketDeliveryMap.addIteration($scope.project.id, number, new Date(), new Date());
    };

    $scope.removeIteration = function(number){
      socketDeliveryMap.removeIteration($scope.project.id, number);
    };

    $scope.editIteration = function(number, from, to){
      socketDeliveryMap.editIteration($scope.project.id, number, from, to);
    };

    $scope.enableEdit = function(feature){
      if (!feature.edit){
        for (var i = $scope.iterations.length - 1; i >= 0; i--) {
          for (var j = $scope.iterations[i].features.length - 1; j >= 0; j--) {
            $scope.iterations[i].features[j].edit = false;
          };
        };
        feature.edit = true;
      }
    };

    $scope.disableEdit = function(){
      for (var i = $scope.iterations.length - 1; i >= 0; i--) {
        for (var j = $scope.iterations[i].features.length - 1; j >= 0; j--) {
          $scope.iterations[i].features[j].edit = false;
        };
      };
    };

    $scope.expand = function(feature){
      if (!feature.expand){
        for (var i = $scope.iterations.length - 1; i >= 0; i--) {
          for (var j = $scope.iterations[i].features.length - 1; j >= 0; j--) {
            $scope.iterations[i].features[j].expand = false;
          };
        };
        feature.expand = true;
      } 
    };

    $scope.navigateToBacklog = function(iterationNumber, featureId) {
      if (!featureId){
        $location.path('/wolof/:projectName/backlog/:iterationNumber'.replace(':projectName', $rootScope.project.name).replace(':iterationNumber', iterationNumber));
      }
    };
}]);
