'use strict';

/**
 * @ngdoc function
 * @name bwwc.controllers:UnmaskSessionCtrl
 * @description
 * # UnmaskSessionCtrl
 */
angular.module('bwwc.controllers')
  .controller('UnmaskSessionCtrl', ['$rootScope', 'STRINGS',
    function ($rootScope, STRINGS) {

      var that = this;
      this.loaded = false;
      this.loading = false;

      $rootScope.pageTitle = STRINGS.PAGE_TITLE_UNMASK;
      $rootScope.headerTitle = STRINGS.HEADER_TITLE_UNMASK;
      $rootScope.headerSubtitle = STRINGS.HEADER_SUBTITLE_UNMASK;

      this.unmask = function () {
        that.loading = true;
      }

    }]);
