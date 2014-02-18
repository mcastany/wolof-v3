'use strict';

angular.module('wolofApp')
  .directive('spinner', function () {
    return {
      template: '<div class="windows8">' + 
				  '<div class="wBall" id="wBall_1">' + 
				    '<div class="wInnerBall">' + 
				    '</div>' + 
				  '</div>' + 
				  '<div class="wBall" id="wBall_2">' + 
				    '<div class="wInnerBall">' + 
				    '</div>' + 
				  '</div>' + 
				  '<div class="wBall" id="wBall_3">' + 
				    '<div class="wInnerBall">' + 
				    '</div>' + 
				  '</div>' + 
				  '<div class="wBall" id="wBall_4">' + 
				    '<div class="wInnerBall">' + 
				    '</div>' + 
				  '</div>' + 
				  '<div class="wBall" id="wBall_5">' + 
				    '<div class="wInnerBall">' + 
				    '</div>' + 
				  '</div>' + 
				'</div>',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });
