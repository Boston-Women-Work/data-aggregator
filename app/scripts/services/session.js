'use strict';

angular.module('bwwc.services')
  .factory('SessionService', ['$q', '$http', function ($q, $http) {
    var session = {};
    console.log('session service');

    /**
     * Generate new public and private key using JSEncrypt
     * @returns promise
       */
    session.generateSession = function () {
      var deferred = $q.defer(),
        jsen = new JSEncrypt();

      jsen.getKey(function() {
        var priKey = jsen.getPrivateKey(),
          pubKey = jsen.getPublicKey(),
          priBlob = new Blob([priKey], {type: "text/plain;charset=utf-8"});

        deferred.resolve(priKey, pubKey, priBlob);
      });

      return deferred.promise;
    };

    /**
     * Store the session on the server
     * @param priKey
     * @param pubKey
     * @param priBlob
       */
    session.storeSession = function (priKey, pubKey, priBlob) {
      var rndSess = Math.floor((Math.random() * 8999999) + 1000000);
    };

    return session;
  }]);
