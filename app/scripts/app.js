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
        .state('sessionGenerator', {
          url: '/session-generator',
          templateUrl: 'views/sessionGenerator.html',
          controller: 'SessionGeneratorCtrl as sessionGenerator'
        })
        .state('sessionViewer', {
          url: '/session-viewer',
          templateUrl: 'views/sessionViewer.html',
          controller: 'SessionViewerCtrl as sessionViewer'
        })
        .state('unmask', {
          url: '/unmask',
          templateUrl: 'views/unmask.html',
          controller: 'UnmaskCtrl as unmask'
        });

      $urlRouterProvider.otherwise('/');
    }]);

angular.module('bwwc.controllers', []);
angular.module('bwwc.services', []);
angular.module('bwwc.directives', []);
angular.module('bwwc.strings', []);
