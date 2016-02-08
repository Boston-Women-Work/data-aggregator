'use strict';

/**
 * @ngdoc function
 * @name bwwc.controllers:SessionGeneratorCtrl
 * @description
 * # SessionGeneratorCtrl
 */
angular.module('bwwc.controllers')
  .controller('SessionGeneratorCtrl', ['SessionService',
    function (SessionService) {
      var that = this,
        privKeyID,
        pubKeyID;
      this.buttonLabel = 'Generate Session';

      this.generateSession = function () {
        this.buttonLabel = 'Loading...';

        SessionService.generateSession()
          .then(function (priKey, pubKey, priBlob) {
            that.sessionGenerated = true;
            privKeyID = priKey;
            pubKeyID = pubKey;
            return SessionService.storeSession(priKey, pubKey, priBlob)
          })
          // SessionService.storeSession
          .then(function (response) {
            // Reset button label to generate new session
            that.buttonLabel = 'Generate Session';

            if (response.error) {
              that.sessionID = response.error;
              that.pubKeyID = response.error;
              that.privKeyID = response.error;
            } else {
              that.sessionID = response.data.rndSess;
              that.pubKeyID = pubKeyID;
              that.privKeyID = privKeyID;
            }
          });
      };
      console.log('sessionGeneratorCtrl.js controller');
    }]);
