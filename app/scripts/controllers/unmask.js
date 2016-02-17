'use strict';

/**
 * @ngdoc function
 * @name bwwc.controllers:UnmaskCtrl
 * @description
 * # UnmaskCtrl
 */
angular.module('bwwc.controllers')
  .controller('UnmaskCtrl', ['$rootScope', 'STRINGS',
    function ($rootScope, STRINGS) {
      $rootScope.pageTitle = STRINGS.PAGE_TITLE_UNMASK;
      $rootScope.headerTitle = STRINGS.HEADER_TITLE_UNMASK;
      $rootScope.headerSubtitle = STRINGS.HEADER_SUBTITLE_UNMASK;
    }]);
