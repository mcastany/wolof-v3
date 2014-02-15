'use strict';

angular.module('wolofApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.sortable',
  'underscore',
  'config'
])
  .config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise('/');
    //
    // Now set up the states
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('project', {
        url: '/wolof',
        abstract: true,
        templateUrl: 'views/navigation.html',
        controller: 'NavigationCtrl'
      })
      .state('create', {
        url: '/wolof/create',
        templateUrl: 'views/create.html',
        controller: 'CreateCtrl'
      })
      .state('project.summary', {
        url: '/:projectName',
        templateUrl: 'views/summary.html',
        controller: 'SummaryCtrl'
      })
      .state('project.backlog', {
        url: '/:projectName/backlog',
        templateUrl: 'views/backlog.html',
        controller: 'BacklogCtrl'
      })
      .state('project.backlogByiteration', {
        url: '/:projectName/backlog/:iterationNumber',
        templateUrl: 'views/backlog.html',
        controller: 'BacklogCtrl'
      })
      .state('project.deliverymap', {
        url: '/:projectName/deliverymap',
        templateUrl: 'views/deliverymap.html',
        controller: 'DeliverymapCtrl'
      })
      .state('project.deliverymapByiteration', {
        url: '/:projectName/deliverymap/:iterationNumber',
        templateUrl: 'views/deliverymap.html',
        controller: 'DeliverymapCtrl'
      })
      .state('project.sod', {
        url: '/:projectName/sod',
        templateUrl: 'views/sod.html',
        controller: 'SodCtrl'
      });
  });