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
    // Get app strings
    STRINGS = $injector.get('STRINGS');
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
      // Set up the mock http service
      $httpBackend = $injector.get('$httpBackend');
      // backend definition common for all tests
      handler = $httpBackend
        .when('GET', /\/get_participants\?last_fetch=(\d+)&session=(\d+)/g)
        .respond(200, {
          '123abc': 'date 1',
          'abc123': 'date 2'
        });
    }));

    it('should return list of participants', function (done) {
      SessionService.getSessionParticipants(123, 456)
        .then(function (response) {
          expect(response.data).toEqual({
            '123abc': 'date 1',
            'abc123': 'date 2'
          });
          done();
        });

      $httpBackend.flush();
    });

    it('date should be set to 0 if not provided', function (done) {
      SessionService.getSessionParticipants(123)
        .then(function (response) {
          expect(response.config.params.last_fetch).toBe(0);
          done();
        });

      $httpBackend.flush();
    });

    it('should return error on 500 status', function (done) {
      handler.respond(500, 'error');

      SessionService.getSessionParticipants(123, 456)
        .then(function (response) {
          var error = {
            error: STRINGS.GET_SESSION_PARTICIPANTS_ERROR
          };
          expect(response).toEqual(error);
          done();
        });

      $httpBackend.flush();
    });
  });

  describe('get masks', function () {

    beforeEach(inject(function ($injector) {
      // Set up the mock http service
      $httpBackend = $injector.get('$httpBackend');
      // backend definition common for all tests
      handler = $httpBackend.when('GET', /\/get_masks\?session=(\d+)/).respond(200, {
        data: "foo"
      });
    }));

    it('should return masks', function (done) {
      SessionService.getMasks(1)
        .then(function (response) {
          expect(response.data).toEqual({data: "foo"});
          done();
        });

      $httpBackend.flush();
    });

    it('should return error on 500 status', function (done) {
      handler.respond(500, 'error');

      SessionService.getMasks(1)
        .then(function (response) {
          var error = {
            error: STRINGS.GET_SESSION_MASKS_ERROR
          };
          expect(response).toEqual(error);
          done();
        });

      $httpBackend.flush();
    });
  });

});
