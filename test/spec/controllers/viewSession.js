'use strict';

describe('Controller: ViewSessionCtrl', function () {

  // load the controller's module
  beforeEach(module('bwwc'));

  var ViewSessionCtrl,
    SessionService,
    $rootScope,
    $interval,
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
    $interval = $injector.get('$interval');

    ViewSessionCtrl = $controller('ViewSessionCtrl', {
      SessionService: SessionService,
      $interval: $interval
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

    it('getSessionParticipants should be called', function () {
      ViewSessionCtrl.getSessionParticipants();
      $rootScope.$apply();
      expect(SessionService.getSessionParticipants).toHaveBeenCalledTimes(1);
    });

    it('should set list of participants', function () {
      ViewSessionCtrl.getSessionParticipants();
      $rootScope.$apply();
      expect(ViewSessionCtrl.participants).toEqual(participants);
    });

    it('participantsLoaded should be true', function () {
      ViewSessionCtrl.getSessionParticipants();
      $rootScope.$apply();
      expect(ViewSessionCtrl.participantsLoaded).toBe(true);
    });

    it('timer should be called continuously', function () {
      ViewSessionCtrl.getSessionParticipants();
      $rootScope.$apply();
      $interval.flush(9999);
      // Don't call again yet
      expect(SessionService.getSessionParticipants).toHaveBeenCalledTimes(1);
      $interval.flush(1);
      // After 10 sec should be called twice
      expect(SessionService.getSessionParticipants).toHaveBeenCalledTimes(2);
      $interval.flush(10000);
      // Keep calling every 10 sec
      expect(SessionService.getSessionParticipants).toHaveBeenCalledTimes(3);
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
        def.resolve(errorMsg);
        return def.promise;
      });
    }));

    it('should set error message to participants', function () {
      ViewSessionCtrl.getSessionParticipants();
      $rootScope.$apply();
      expect(ViewSessionCtrl.participants).toEqual(errorMsg);
    });

    it('participantsLoaded should be true', function () {
      ViewSessionCtrl.getSessionParticipants();
      $rootScope.$apply();
      expect(ViewSessionCtrl.participantsLoaded).toBe(true);
    });
  });

});
