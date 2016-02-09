'use strict';

var saveAs;

describe('Service: SessionService', function () {
  var SessionService,
    STRINGS,
    $httpBackend,
    handler;

  beforeEach(module('bwwc'));

  beforeEach(inject(function ($injector) {
    // Get session service
    SessionService = $injector.get('SessionService');
    // Get app strings
    STRINGS = $injector.get('STRINGS');
    // Set up the mock http service
    $httpBackend = $injector.get('$httpBackend');
    // backend definition common for all tests
    handler = $httpBackend.when('POST', '/create_session').respond({});

    saveAs = jasmine.createSpy('saveAs');
  }));

  describe('store session', function () {

    it('should return session id as response', function () {

      SessionService.storeSession(1, 2, 3, 123)
        .then(function (response) {
          expect(response).toEqual({ data: { sessionID: '123' } });
        });

      $httpBackend.flush();
    });

    it('should call saveAs with right parameters', function () {

      SessionService.storeSession(1, 2, 3, 123)
        .then(function () {
          expect(saveAs).toHaveBeenCalledWith(3, 'Session_123_private_key.pem');
        });

      $httpBackend.flush();
    });

    it('should return error on 500 status', function () {

      handler.respond(500, 'error');
      SessionService.storeSession(1, 2, 3)
        .then(function (response) {
          expect(response).toEqual({error: STRINGS.CREATE_SESSION_ERROR});
        });

      $httpBackend.flush();
    });
  });

});
