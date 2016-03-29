'use strict';

angular
  .module('bwwc', [
    'bwwc.controllers',
    'bwwc.services',
    'bwwc.directives',
    'bwwc.strings',
    'ui.router',
    'ui.bootstrap',
    'ngSanitize',
    'ngHandsontable'
  ])
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('client', {
          url: '/',
          templateUrl: 'views/client.html',
          controller: 'ClientCtrl as client'
        })
        .state('generateSession', {
          url: '/generate-session',
          templateUrl: 'views/generateSession.html',
          controller: 'GenerateSessionCtrl as generateSession'
        })
        .state('viewSession', {
          url: '/view-session',
          templateUrl: 'views/viewSession.html',
          controller: 'ViewSessionCtrl as viewSession'
        })
        .state('unmaskSession', {
          url: '/unmask-session',
          templateUrl: 'views/unmaskSession.html',
          controller: 'UnmaskSessionCtrl as unmaskSession'
        });

      $urlRouterProvider.otherwise('/');
    }]);

angular.module('bwwc.controllers', []);
angular.module('bwwc.services', []);
angular.module('bwwc.directives', []);
angular.module('bwwc.strings', []);
