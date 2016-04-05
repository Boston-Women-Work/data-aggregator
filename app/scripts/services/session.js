'use strict';

angular.module('bwwc.services')
  .factory('SessionService', ['$q', '$http', 'STRINGS',
    function ($q, $http, STRINGS) {
      var session = {};

      /**
       * Generate new public and private key using JSEncrypt
       * @returns deferred.promise
       */
      session.generateSession = function () {
        var sessionID = Math.floor((Math.random() * 8999999) + 1000000);
        var deferred = $q.defer(),
          jsen = new window.JSEncrypt();

        jsen.getKey(function () {
          var priKey = jsen.getPrivateKey(),
            pubKey = jsen.getPublicKey(),
            priBlob = new Blob([priKey], {type: "text/plain;charset=utf-8"});

          deferred.resolve({
            privKeyID: priKey,
            pubKeyID: pubKey,
            priBlob: priBlob,
            sessionID: sessionID
          });
        });

        return deferred.promise;
      };

      /**
       * Store the session on the server
       * @param priKey Private key
       * @param pubKey Public key
       * @param priBlob Binary blob of private key to store locally
       * @param sessionID Session ID
       * @returns The session ID as a string, or an error message
       */
      session.storeSession = function (priKey, pubKey, priBlob, sessionID) {

        return $http({
          url: '/create_session',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({session: sessionID, publickey: pubKey})
        }).then(function successCallback() {
          // Save private key to file system
          window.saveAs(priBlob, 'Session_' + sessionID.toString() + '_private_key.pem');
          return {
            data: {
              sessionID: sessionID.toString()
            }
          };
        }, function errorCallback() {
          return {
            error: STRINGS.GENERATE_SESSION_ERROR
          };
        });
      };

      /**
       * Get a list of session participants
       * @param sessionID The session ID
       * @param last_fetch Last time participants have been fetched
       * @returns List of participants in the form of {hash: time_stamp, hash2: time_stamp}
       */
      session.getSessionParticipants = function (sessionID, last_fetch) {
        if (last_fetch === undefined) {
          last_fetch = 0;
        }

        return $http({
          url: '/get_participants',
          method: 'GET',
          params: {session: sessionID, last_fetch: last_fetch}
        }).then(function successCallback(response) {
          return response;
        }, function errorCallback() {
          return {
            error: STRINGS.GET_SESSION_PARTICIPANTS_ERROR
          }
        });
      };

      /**
       *
       * @param sessionKey
       */
      session.getMasks = function (sessionKey) {
        return $http({
          url: '/get_masks',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          params: {session: sessionKey}
        }).then(function successCallback(response) {
          return response;
        }, function errorCallback() {
          return {
            error: STRINGS.GET_SESSION_MASKS_ERROR
          }
        });
      };

      return session;
    }]);
