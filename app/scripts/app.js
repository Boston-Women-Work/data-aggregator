'use strict';

angular
  .module('bwwc', [
    'bwwc.controllers',
    'bwwc.services',
    'bwwc.directives',
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
        .state('session-creator', {
          url: '/session-creator/',
          templateUrl: 'views/session_creator.html',
          controller: 'SessionCreatorCtrl as sessionCreator'
        })
        .state('session-viewer', {
          url: '/session-viewer/',
          templateUrl: 'views/session_viewer.html',
          controller: 'SessionViewerCtrl as sessionViewer'
        })
        .state('unmask', {
          url: '/unmask/',
          templateUrl: 'views/unmask.html',
          controller: 'UnmaskCtrl as unmask'
        });

      $urlRouterProvider.otherwise('/');
    }]);

angular.module('bwwc.controllers', []);
angular.module('bwwc.services', []);
angular.module('bwwc.directives', []);
