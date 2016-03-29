'use strict';

describe('Controller: UnmaskSessionCtrl', function () {

  // load the controller's module
  beforeEach(module('bwwc'));

  var UnmaskSessionCtrl,
    $rootScope,
    STRINGS;

  // Initialize the controller
  beforeEach(inject(function ($controller, $injector) {

    STRINGS = $injector.get('STRINGS');

    UnmaskSessionCtrl = $controller('UnmaskSessionCtrl', {
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
