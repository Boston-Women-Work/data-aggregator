'use strict';

describe('Controller: SessionGeneratorCtrl', function () {

  // load the controller's module
  beforeEach(module('bwwc'));

  var SessionGeneratorCtrl,
    SessionService,
    STRINGS,
    $rootScope;

  // Initialize the controller
  beforeEach(inject(function ($controller, $injector, $q) {

    SessionService = {
      generateSession: function () {
      },
      storeSession: function () {
      }
    };

    spyOn(SessionService, 'generateSession').and.callFake(function () {
      var def = $q.defer();
      def.resolve({privKeyID: 1, pubKeyID: 2, priBlob: 3, sessionID: 123});
      return def.promise;
    });

    STRINGS = $injector.get('STRINGS');

    SessionGeneratorCtrl = $controller('SessionGeneratorCtrl', {
      SessionService: SessionService
    });
  }));

  describe('initial state', function () {

    it('button label should be set', function () {
      expect(SessionGeneratorCtrl.buttonLabel).toBe(STRINGS.GENERATE_SESSION_BUTTON_NORMAL);
    });

    it('loading should be false', function () {
      expect(SessionGeneratorCtrl.loading).toBe(false);
    });

    it('sessionGenerated should be undefined', function () {
      expect(SessionGeneratorCtrl.sessionGenerated).toBe(undefined);
    });
  });

  describe('generateSession before completed', function () {

    it('button label should change', function () {
      SessionGeneratorCtrl.generateSession();
      expect(SessionGeneratorCtrl.buttonLabel).toBe(STRINGS.GENERATE_SESSION_BUTTON_LOADING);
    });

    it('loading should be true', function () {
      SessionGeneratorCtrl.generateSession();
      expect(SessionGeneratorCtrl.loading).toBe(true);
    });

    it('key ids should not be set', function () {
      SessionGeneratorCtrl.generateSession();
      expect(SessionGeneratorCtrl.sessionID).not.toBeTruthy();
      expect(SessionGeneratorCtrl.pubKeyID).not.toBeTruthy();
      expect(SessionGeneratorCtrl.privKeyID).not.toBeTruthy();
    });
  });

  describe('generateSession after completed', function () {

    beforeEach(inject(function($injector, $q) {
      $rootScope = $injector.get('$rootScope');

      // This is the successful response
      spyOn(SessionService, 'storeSession').and.callFake(function () {
        var def = $q.defer();
        def.resolve({data:{sessionID: 123}});
        return def.promise;
      });
    }));

    it('button label should reset to initial state', function () {
      SessionGeneratorCtrl.generateSession();
      $rootScope.$apply();
      expect(SessionGeneratorCtrl.buttonLabel).toBe(STRINGS.GENERATE_SESSION_BUTTON_NORMAL);
    });

    it('loading should be false', function () {
      SessionGeneratorCtrl.generateSession();
      $rootScope.$apply();
      expect(SessionGeneratorCtrl.loading).toBe(false);
    });

    it('sessionGenerated should be true', function () {
      SessionGeneratorCtrl.generateSession();
      $rootScope.$apply();
      expect(SessionGeneratorCtrl.sessionGenerated).toBe(false);
    });

    it('key ids should be set', function () {
      SessionGeneratorCtrl.generateSession();
      $rootScope.$apply();
      expect(SessionGeneratorCtrl.sessionID).toBe(123);
      expect(SessionGeneratorCtrl.pubKeyID).toBe(2);
      expect(SessionGeneratorCtrl.privKeyID).toBe(1);
    });
  });

  describe('generateSession after completed with error', function () {

    beforeEach(inject(function ($injector, $q) {
      $rootScope = $injector.get('$rootScope');

      // This is the error response
      spyOn(SessionService, 'storeSession').and.callFake(function () {
        var def = $q.defer();
        def.resolve({error: STRINGS.GENERATE_SESSION_ERROR});
        return def.promise;
      });
    }));

    it('should return error message for database error', function() {
      SessionGeneratorCtrl.generateSession();
      $rootScope.$apply();
      expect(SessionGeneratorCtrl.sessionID).toBe(STRINGS.GENERATE_SESSION_ERROR);
      expect(SessionGeneratorCtrl.pubKeyID).toBe(STRINGS.GENERATE_SESSION_ERROR);
      expect(SessionGeneratorCtrl.privKeyID).toBe(STRINGS.GENERATE_SESSION_ERROR);
    });

  });
});
