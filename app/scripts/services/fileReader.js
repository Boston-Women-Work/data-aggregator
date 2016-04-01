'use strict';

angular.module('bwwc.services')
  .factory('FileReaderService', ['$q',
    function ($q) {
      var fileReader = {};

      /**
       * Read the private key supplied by the user.
       *
       * @param file Private key
       */
      fileReader.readPrivateKey = function (file) {
        var deferred = $q.defer(),
          fileReader = new FileReader();

        fileReader.onload = function () {
          deferred.resolve(fileReader.result);
        };

        fileReader.onerror = function () {
          deferred.reject(fileReader.result);
        };

        fileReader.readAsText(file);

        return deferred.promise;
      };

      return fileReader;
    }]);
