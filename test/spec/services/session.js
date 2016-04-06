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


  describe('decrypt masks', function () {
    it('should return decrypted masks', function () {
      var privateKey = ['-----BEGIN RSA PRIVATE KEY-----',
        'MIICXAIBAAKBgQC+slfL+yjqEAozo8otIg/X/a1pRrvH0OvP2T4UFDYO+xXgzVFY',
        'xIbV5Oz6LDLamfh1E0DBGiGKsgZ4vpLHl1LqoLhSME0y4HAkFhXmHXwZ/JNmYL3z',
        'qgvkuKYscJDwreWjaeXoA5IA0o+Ut6bUblFuVOpC6hJJtpplN0OXnu3dQwIDAQAB',
        'AoGAItdm3ygGc612j7TPTau5hVceBewchweO7izdAMIollgdyTL6N+PAVvg6rALD',
        'T9lt4cYgwKdLlZGtSQZYvwrQ5SiZp+9/h6bLpl7qWJ2V9sV3/3QsxQBfbO4vQMEg',
        '5N98gSNzfwJP5KLvM1mBJMgeGvqxbG7wW1GdeeYHsU6WxcECQQDpFVd2wM+t/AgY',
        'Jduu17pbGBMB1MZUSfPmQuuDqdkBg2yAQVTgHvIXz7HH+gKJq/Y7LGbzF+Sm2jJG',
        'E7jk+8dRAkEA0XIjBavgY684dSKikj+KGliK6VFmLjIy5K9NZyi6XUrP0ieJZLk/',
        'gAtkshdTxNtzYUT0X2Ejz7kcgQm+LjTeUwJAICL9KDZ1a/uv8gRmQbkkzKKJHFuF',
        '7OE1a64WYtTsQrUoJJbdaPlbT8UnMfdamjjHfmkk2KeWsxqqi9b0Sz4bwQJBAJ+z',
        'CrdBVehMa50NGq6u2iu6hbjfwyzIQ/wRGtDkwi1uZMYWNXHiumN0zIPqu4nn1rM9',
        'M6QiWn8B45UUi7mJwFcCQHIURDrwCZWodWUYWF3J04mDN42wK6fnaD5aWcNjgVvO',
        'fqtX83Hut4ntch9j9IS1yqvB7yzfgquniQPY2+7jHZo=',
        '-----END RSA PRIVATE KEY-----'].join('\n');
      var data = '[{\"_id\":\"d10ca8d11301c2f4993ac2279ce4b930\",\"session\":3429008,\"fields\":{\"foo\":\"Ed8L1oN00N15OqfNWG5sOnoE7XLmirHFfmmX+Yx0PzTQvUruCZEmkZL+N3jHe8svVX/9AiRI3RLN05KI6nv30LxQ89E2h9c1ya+ZyQOB8EaZgI7WuWdASCiCtjXfJ16Bdk9XxAugR4nphzE3YkE/o8vo0fAxTuzTdp95KHmp46Y=\", \"bar\":\"Ed8L1oN00N15OqfNWG5sOnoE7XLmirHFfmmX+Yx0PzTQvUruCZEmkZL+N3jHe8svVX/9AiRI3RLN05KI6nv30LxQ89E2h9c1ya+ZyQOB8EaZgI7WuWdASCiCtjXfJ16Bdk9XxAugR4nphzE3YkE/o8vo0fAxTuzTdp95KHmp46Y=\"}}]';

      var decryptedMask = SessionService.decryptMasks(data, privateKey);
      expect(decryptedMask).toEqual([{foo: '436948924', bar: '436948924'}]);
    });
  });

});
