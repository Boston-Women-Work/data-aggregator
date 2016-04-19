'use strict';

angular.module('bwwc.services')
  .factory('SessionService', ['$q', '$http', 'STRINGS',
    function ($q, $http, STRINGS) {
      var session = {};

      /**
       * Generate new public and private key using JSEncrypt
       * @returns Function Deferred.promise
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
          return $q.reject({
            error: STRINGS.GENERATE_SESSION_ERROR
          });
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
          return $q.reject({
            error: STRINGS.GET_SESSION_PARTICIPANTS_ERROR
          });
        });
      };

      /**
       * Get all masks for a given session.
       * @param sessionKey Session ID
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
          return $q.reject({
            error: STRINGS.GET_SESSION_MASKS_ERROR
          });
        });
      };

      /**
       * Decrypt session masks.
       * @param masks The masks to decrypt, should contain a fields property with the masked data ({fields: {foo: 1}})
       * @param privateKey The private key to decrypt the masks
       */
      session.decryptMasks = function (masks, privateKey) {

        var decryptObj = new window.JSEncrypt();
        decryptObj.setPrivateKey(privateKey);

        var mOut = JSON.parse(masks);
        var maskedData = [];

        mOut.forEach(function (element) {
          maskedData.push(element.fields);
        });

        // Decrypt the JSON data.
        var decryptedJson = _.map(maskedData, function (submission) {
          return _.mapObject(submission, function (val) {
            return decryptObj.decrypt(val);
          });
        });

        return decryptedJson;
      };

      /**
       * Send masked aggregate to server and get back the final aggregate values.
       * @param aggregatedMasks Aggregate of all masked values
       * @param sessionKey Session ID
       * @returns
         */
      session.calculateFinalAggregate = function (aggregatedMasks, sessionKey) {
        return $http({
          url: '/submit_agg',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({data: aggregatedMasks, session: sessionKey})
        }).then(function success(response) {
          return response;
        }, function error(response) {
          return $q.reject(response);
        });
      };

      return session;
    }]);
