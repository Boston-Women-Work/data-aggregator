'use strict';

describe('Controller: SessionViewerCtrl', function () {

  // load the controller's module
  beforeEach(module('bwwc'));

  var SessionViewerCtrl,
    SessionService,
    $rootScope,
    STRINGS,
    participants,
    errorMsg;

  // Initialize the controller
  beforeEach(inject(function ($controller, $injector) {

    SessionService = {
      getSessionParticipants: function () {
      }
    };

    STRINGS = $injector.get('STRINGS');

    SessionViewerCtrl = $controller('SessionViewerCtrl', {
      SessionService: SessionService
    });
  }));

  describe('get session participants success', function () {

    beforeEach(inject(function ($injector, $q) {
      $rootScope = $injector.get('$rootScope');

      // This is the successful response
      spyOn(SessionService, 'getSessionParticipants').and.callFake(function () {
        var def = $q.defer();
        participants = {email1: "date1", email2: "date2"};
        def.resolve(participants);
        return def.promise;
      });
    }));

    it('page and header title should be correct', function () {
      expect($rootScope.pageTitle).toBe(STRINGS.PAGE_TITLE_SESSION_VIEWER);
      expect($rootScope.headerTitle).toBe(STRINGS.HEADER_TITLE_SESSION_VIEWER);
      expect($rootScope.headerSubtitle).toBe(STRINGS.HEADER_SUBTITLE_SESSION_VIEWER);
    });

    it('should set list of participants', function () {
      SessionViewerCtrl.getSessionParticipants();
      $rootScope.$apply();
      expect(SessionViewerCtrl.participants).toEqual(participants);
    });

    it('participantsLoaded should be true', function () {
      SessionViewerCtrl.getSessionParticipants();
      $rootScope.$apply();
      expect(SessionViewerCtrl.participantsLoaded).toBe(true);
    });
  });

  describe('get session participants error', function () {

    beforeEach(inject(function ($injector, $q) {
      $rootScope = $injector.get('$rootScope');

      // This is the error response
      spyOn(SessionService, 'getSessionParticipants').and.callFake(function () {
        var def = $q.defer();
        errorMsg = {};
        errorMsg[STRINGS.GET_SESSION_PARTICIPANTS_ERROR] = STRINGS.GET_SESSION_PARTICIPANTS_ERROR;
        def.reject(errorMsg);
        return def.promise;
      });
    }));

    it('should set error message to participants', function () {
      SessionViewerCtrl.getSessionParticipants();
      $rootScope.$apply();
      expect(SessionViewerCtrl.participants).toEqual(errorMsg);
    });

    it('participantsLoaded should be true', function () {
      SessionViewerCtrl.getSessionParticipants();
      $rootScope.$apply();
      expect(SessionViewerCtrl.participantsLoaded).toBe(true);
    });
  });

});
