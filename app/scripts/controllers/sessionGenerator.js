'use strict';

/**
 * @ngdoc function
 * @name bwwc.controllers:SessionGeneratorCtrl
 * @description
 * # SessionGeneratorCtrl
 */
angular.module('bwwc.controllers')
  .controller('SessionGeneratorCtrl', ['SessionService', 'STRINGS', '$rootScope',
    function (SessionService, STRINGS, $rootScope) {

      var that = this,
        privKeyID,
        pubKeyID;
      this.buttonLabel = STRINGS.GENERATE_SESSION_BUTTON_NORMAL;
      this.loading = false;

      $rootScope.pageTitle = STRINGS.PAGE_TITLE_SESSION_GENERATOR;
      $rootScope.headerTitle = STRINGS.HEADER_TITLE_SESSION_GENERATOR;
      $rootScope.headerSubtitle = STRINGS.HEADER_SUBTITLE_SESSION_GENERATOR;

      this.generateSession = function () {
        this.buttonLabel = STRINGS.GENERATE_SESSION_BUTTON_LOADING;
        this.loading = true;

        SessionService.generateSession()
          .then(function (resp) {
            that.sessionGenerated = true;
            privKeyID = resp.privKeyID;
            pubKeyID = resp.pubKeyID;
            return SessionService.storeSession(resp.privKeyID, resp.pubKeyID, resp.priBlob, resp.sessionID);
          })
          // SessionService.storeSession
          .then(function (response) {
            // Reset button label to generate new session
            that.buttonLabel = STRINGS.GENERATE_SESSION_BUTTON_NORMAL;
            that.loading = false;

            if (response.error) {
              that.sessionID = response.error;
              that.pubKeyID = response.error;
              that.privKeyID = response.error;
            } else {
              that.sessionID = response.data.sessionID;
              that.pubKeyID = pubKeyID;
              that.privKeyID = privKeyID;
            }
          });
      };
    }]);
