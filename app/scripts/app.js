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
    'ngHandsontable',
    'angular-ladda'
  ])
  .config(['$stateProvider', '$urlRouterProvider', 'laddaProvider',
    function ($stateProvider, $urlRouterProvider, laddaProvider) {

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

      laddaProvider.setOption({
        style: 'zoom-in',
        spinnerSize: 28,
        spinnerColor: '#ffffff'
      });
    }]);

angular.module('bwwc.controllers', []);
angular.module('bwwc.services', []);
angular.module('bwwc.directives', []);
angular.module('bwwc.strings', []);
