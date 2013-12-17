'use strict';

angular.module('wolofApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/wolof', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      //Displays a summary of the project. Could be a merge of Kickoff and Project Closure
      .when('/wolof/:projectName',{
        templateUrl: 'views/summary.html',
        controller: 'SummaryCtrl'
      })
      //Shows the currrent iteration of the project
      .when('/wolof/:projectName/backlog', {
        templateUrl: 'views/backlog.html',
        controller: 'BacklogCtrl'
      })
      .when('/wolof/:projectName/backlog/:iterationNumber', {
        templateUrl: 'views/backlog.html',
        controller: 'BacklogCtrl'
      })
      //Shows the delivery map of a particlar project
      .when('/wolof/:projectName/deliverymap', {
        templateUrl: 'views/deliverymap.html',
        controller: 'DeliverymapCtrl'
      })
      //Shows the delivery map of a particlar project
      .when('/wolof/:projectName/deliverymap/:iterationNumber', {
        templateUrl: 'views/deliverymap.html',
        controller: 'DeliverymapCtrl'
      })
      //Shows the current assigned stories excluding blocked and completed
      .when('/wolof/:projectName/sod', {
        templateUrl: 'views/sod.html',
        controller: 'SodCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
