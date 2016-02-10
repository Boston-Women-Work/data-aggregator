'use strict';

/**
 * @ngdoc function
 * @name bwwc.controllers:SessionGeneratorCtrl
 * @description
 * # SessionGeneratorCtrl
 */
angular.module('bwwc.controllers')
  .controller('SessionGeneratorCtrl', ['SessionService', 'STRINGS',
    function (SessionService, STRINGS) {

      var that = this,
        privKeyID,
        pubKeyID;
      this.buttonLabel = STRINGS.GENERATE_SESSION_BUTTON_NORMAL;
      this.loading = false;

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

      console.log('sessionGeneratorCtrl.js controller');
    }]);
