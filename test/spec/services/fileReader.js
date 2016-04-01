'use strict';

describe('Service: FileReaderService', function () {
  var FileReaderService,
    fileReader,
    $rootScope;

  beforeEach(module('bwwc'));

  beforeEach(inject(function ($injector) {
    // Get session service
    FileReaderService = $injector.get('FileReaderService');
    // rootScope is needed to resolve promises
    $rootScope = $injector.get('$rootScope');

    fileReader = {
      readAsText: function () {
      },
      result: 'foo'
    };

    // Spy on global JSEncrypt object, then return mock
    spyOn(window, 'FileReader').and.returnValue(fileReader);
    // Now create spy of mock to verify methods are called
    spyOn(fileReader, 'readAsText').and.callThrough();

  }));


  describe('read private key', function () {
    it('should call readAsText once', function () {
      FileReaderService.readPrivateKey('foo');
      expect(fileReader.readAsText.calls.count()).toEqual(1);
    });

    it('should create onload and onerror property', function () {
      FileReaderService.readPrivateKey('foo');
      expect(fileReader.onload).toBeDefined();
      expect(fileReader.onerror).toBeDefined();
    });

    it('should return promise', function () {
      var promise = FileReaderService.readPrivateKey('foo');
      expect(promise.then).toBeDefined();
    });

    it('should return result in onload', function (done) {
      fileReader.readAsText = function () {
        this.onload();
      };
      FileReaderService.readPrivateKey('foo')
        .then(function success(result) {
          expect(result).toBe('foo');
          done();
        });
      $rootScope.$apply();
    });

    it('should return result in onerror', function (done) {
      fileReader.readAsText = function () {
        this.onerror();
      };
      FileReaderService.readPrivateKey('foo')
        .then(function () {
        }, function error(result) {
          expect(result).toBe('foo');
          done();
        });
      $rootScope.$apply();
    });
  });
});
