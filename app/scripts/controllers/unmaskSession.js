'use strict';

/**
 * @ngdoc function
 * @name bwwc.controllers:UnmaskSessionCtrl
 * @description
 * # UnmaskSessionCtrl
 */
angular.module('bwwc.controllers')
  .controller('UnmaskSessionCtrl', ['$rootScope', 'STRINGS', 'SessionService', 'FileReaderService',
    function ($rootScope, STRINGS, SessionService, FileReaderService) {

      var that = this;
      this.loaded = false;
      this.loading = false;

      $rootScope.pageTitle = STRINGS.PAGE_TITLE_UNMASK;
      $rootScope.headerTitle = STRINGS.HEADER_TITLE_UNMASK;
      $rootScope.headerSubtitle = STRINGS.HEADER_SUBTITLE_UNMASK;

      this.unmask = function () {
        that.loading = true;

        if (that.sessionKey && that.privateKey) {
          FileReaderService.readPrivateKey(document.getElementById('privateKey').files[0])

            .then(function success(file) {
              var decryptObj = new window.JSEncrypt();
              decryptObj.setPrivateKey(file);

              return SessionService.unmask(file);
              // FileReaderService error
            }, function error() {
              console.error('Failed loading private key');
            })

            // SessionService.unmask()
            .then(function success() {

            }, function error() {

            });
        }

      };

    }]);
