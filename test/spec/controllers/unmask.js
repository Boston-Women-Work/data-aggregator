'use strict';

describe('Controller: UnmaskCtrl', function () {

  // load the controller's module
  beforeEach(module('bwwc'));

  var UnmaskCtrl,
    $rootScope,
    STRINGS;

  // Initialize the controller
  beforeEach(inject(function ($controller, $injector) {

    STRINGS = $injector.get('STRINGS');

    UnmaskCtrl = $controller('UnmaskCtrl', {
    });
  }));

  describe('initial state', function () {

    beforeEach(inject(function ($injector) {
      $rootScope = $injector.get('$rootScope');
    }));

    it('page and header title should be correct', function () {
      expect($rootScope.pageTitle).toBe(STRINGS.PAGE_TITLE_UNMASK);
      expect($rootScope.headerTitle).toBe(STRINGS.HEADER_TITLE_UNMASK);
      expect($rootScope.headerSubtitle).toBe(STRINGS.HEADER_SUBTITLE_UNMASK);
    });
  });

});
