'use strict';

var saveAs;

describe('Service: SessionService', function () {
  var SessionService,
    STRINGS,
    jsen,
    $httpBackend,
    handler,
    $rootScope;

  beforeEach(module('bwwc'));

  beforeEach(inject(function ($injector) {
    // Get session service
    SessionService = $injector.get('SessionService');
    // rootScope is needed to resolve promises
    $rootScope = $injector.get('$rootScope');
  }));


  describe('create session', function () {

    beforeEach(function () {
      // Mock for JSEncrypt
      jsen = {
        getKey: function (callback) {
          callback();
        },
        getPrivateKey: function () {
          //return 1;
        },
        getPublicKey: function () {
          //return 2;
        }
      };

      // Spy on global JSEncrypt object, then return mock
      spyOn(window, 'JSEncrypt').and.returnValue(jsen);
      // Now create spy of mock to verify methods are called
      spyOn(jsen, 'getKey').and.callThrough();
    });

    it('calls JSEncrypt getKey', function () {
      SessionService.generateSession();
      expect(jsen.getKey).toHaveBeenCalled();
    });

    it('calls JSEncrypt getPrivateKey', function (done) {
      spyOn(jsen, 'getPrivateKey');

      SessionService.generateSession().then(function () {
        expect(jsen.getPrivateKey).toHaveBeenCalled();
        done();
      });

      $rootScope.$apply();
    });

    it('calls JSEncrypt getPublicKey', function (done) {
      spyOn(jsen, 'getPublicKey');

      SessionService.generateSession().then(function () {
        expect(jsen.getPublicKey).toHaveBeenCalled();
        done();
      });

      $rootScope.$apply();
    });

  });


  describe('store session', function () {

    beforeEach(inject(function ($injector) {
      // Get app strings
      STRINGS = $injector.get('STRINGS');
      // Set up the mock http service
      $httpBackend = $injector.get('$httpBackend');
      // backend definition common for all tests
      handler = $httpBackend.when('POST', '/create_session').respond({});

      saveAs = jasmine.createSpy('saveAs');
    }));

    it('should return session id as response', function (done) {
      SessionService.storeSession(1, 2, 3, 123)
        .then(function (response) {
          expect(response).toEqual({data: {sessionID: '123'}});
          done();
        });

      $httpBackend.flush();
    });

    it('should call saveAs with right parameters', function (done) {
      SessionService.storeSession(1, 2, 3, 123)
        .then(function () {
          expect(saveAs).toHaveBeenCalledWith(3, 'Session_123_private_key.pem');
          done();
        });

      $httpBackend.flush();
    });

    it('should return error on 500 status', function (done) {
      handler.respond(500, 'error');

      SessionService.storeSession(1, 2, 3)
        .then(function (response) {
          expect(response).toEqual({error: STRINGS.GENERATE_SESSION_ERROR});
          done();
        });

      $httpBackend.flush();
    });
  });

  describe('get session participants', function () {

    beforeEach(inject(function ($injector) {
      // Get app strings
      STRINGS = $injector.get('STRINGS');
      // Set up the mock http service
      $httpBackend = $injector.get('$httpBackend');
      // backend definition common for all tests
      handler = $httpBackend.when('GET', '/get_participants?last_fetch=date&session=123').respond(200, {
        '123abc': 'date 1',
        'abc123': 'date 2'
      });
    }));

    it('should return list of participants', function (done) {
      SessionService.getSessionParticipants(123, 'date')
        .then(function (response) {
          expect(response.data).toEqual({
            '123abc': 'date 1',
            'abc123': 'date 2'
          });
          done();
        });

      $httpBackend.flush();
    });

    it('should return error on 500 status', function (done) {
      handler.respond(500, 'error');

      SessionService.getSessionParticipants(123, 'date')
        .then(function (response) {
          expect(response).toEqual({error: STRINGS.GET_SESSION_PARTICIPANTS_ERROR});
          done();
        });

      $httpBackend.flush();
    });
  });

});
