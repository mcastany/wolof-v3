'use strict';

angular.module('wolofApp').directive('wEditable', function () {
  return {
    template:
      '<div ng-dblclick="edit = true">' +
        '<div class="closearea">' +
          '<div class="close-border avoid-selection" ng-click="removeHandler()">X</div>' +
        '</div>' +
        '<span ng-hide="edit">{{property}}</span><input ng-show="edit" type="text" ng-model="property" ng-enter="edit = false" />' +
        '<a ng-show="edit"  ng-click="edit = false"><i class="fa fa-check"></i></a>' +
      '</div>',
    restrict: 'A',
    replace: true,
    scope: {
      property: '=',
      edit: '@',
      removeHandler: '&'
    },
    link: function (scope, element) {
      /**scope, element*/

      scope.$watch('edit', function(){
        if (scope.edit){
          element.find('input')[0].select();
          element.find('input')[0].focus();
        }
      });
    }
  };
});
