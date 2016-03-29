'use strict';

describe('Controller: GenerateSessionCtrl', function () {

  // load the controller's module
  beforeEach(module('bwwc'));

  var GenerateSessionCtrl,
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
    $rootScope = $injector.get('$rootScope');

    GenerateSessionCtrl = $controller('GenerateSessionCtrl', {
      SessionService: SessionService,
      $rootScope: $rootScope
    });
  }));

  describe('initial state', function () {

    it('button label should be set', function () {
      expect(GenerateSessionCtrl.buttonLabel).toBe(STRINGS.GENERATE_SESSION_BUTTON_NORMAL);
    });

    it('loading should be false', function () {
      expect(GenerateSessionCtrl.loading).toBe(false);
    });

    it('sessionGenerated should be undefined', function () {
      expect(GenerateSessionCtrl.sessionGenerated).toBe(undefined);
    });

    it('page and header title should be correct', function () {
      expect($rootScope.pageTitle).toBe(STRINGS.PAGE_TITLE_SESSION_GENERATOR);
      expect($rootScope.headerTitle).toBe(STRINGS.HEADER_TITLE_SESSION_GENERATOR);
      expect($rootScope.headerSubtitle).toBe(STRINGS.HEADER_SUBTITLE_SESSION_GENERATOR);
    });
  });

  describe('generateSession before completed', function () {

    it('button label should change', function () {
      GenerateSessionCtrl.generateSession();
      expect(GenerateSessionCtrl.buttonLabel).toBe(STRINGS.GENERATE_SESSION_BUTTON_LOADING);
    });

    it('loading should be true', function () {
      GenerateSessionCtrl.generateSession();
      expect(GenerateSessionCtrl.loading).toBe(true);
    });

    it('key ids should not be set', function () {
      GenerateSessionCtrl.generateSession();
      expect(GenerateSessionCtrl.sessionID).not.toBeTruthy();
      expect(GenerateSessionCtrl.pubKeyID).not.toBeTruthy();
      expect(GenerateSessionCtrl.privKeyID).not.toBeTruthy();
    });
  });

  describe('generateSession after completed', function () {

    beforeEach(inject(function ($q) {
      // This is the successful response
      spyOn(SessionService, 'storeSession').and.callFake(function () {
        var def = $q.defer();
        def.resolve({data: {sessionID: 123}});
        return def.promise;
      });
    }));

    it('button label should reset to initial state', function () {
      GenerateSessionCtrl.generateSession();
      $rootScope.$apply();
      expect(GenerateSessionCtrl.buttonLabel).toBe(STRINGS.GENERATE_SESSION_BUTTON_NORMAL);
    });

    it('loading should be false', function () {
      GenerateSessionCtrl.generateSession();
      $rootScope.$apply();
      expect(GenerateSessionCtrl.loading).toBe(false);
    });

    it('sessionGenerated should be true', function () {
      GenerateSessionCtrl.generateSession();
      $rootScope.$apply();
      expect(GenerateSessionCtrl.sessionGenerated).toBe(true);
    });

    it('key ids should be set', function () {
      GenerateSessionCtrl.generateSession();
      $rootScope.$apply();
      expect(GenerateSessionCtrl.sessionID).toBe(123);
      expect(GenerateSessionCtrl.pubKeyID).toBe(2);
      expect(GenerateSessionCtrl.privKeyID).toBe(1);
    });
  });

  describe('generateSession after completed with error', function () {

    beforeEach(inject(function ($q) {
      // This is the error response
      spyOn(SessionService, 'storeSession').and.callFake(function () {
        var def = $q.defer();
        def.reject({error: STRINGS.GENERATE_SESSION_ERROR});
        return def.promise;
      });
    }));

    it('should return error message for database error', function () {
      GenerateSessionCtrl.generateSession();
      $rootScope.$apply();
      expect(GenerateSessionCtrl.sessionID).toBe(STRINGS.GENERATE_SESSION_ERROR);
      expect(GenerateSessionCtrl.pubKeyID).toBe(STRINGS.GENERATE_SESSION_ERROR);
      expect(GenerateSessionCtrl.privKeyID).toBe(STRINGS.GENERATE_SESSION_ERROR);
    });

    it('button label should reset to initial state', function () {
      GenerateSessionCtrl.generateSession();
      $rootScope.$apply();
      expect(GenerateSessionCtrl.buttonLabel).toBe(STRINGS.GENERATE_SESSION_BUTTON_NORMAL);
    });

    it('loading should be false', function () {
      GenerateSessionCtrl.generateSession();
      $rootScope.$apply();
      expect(GenerateSessionCtrl.loading).toBe(false);
    });
  });
});
