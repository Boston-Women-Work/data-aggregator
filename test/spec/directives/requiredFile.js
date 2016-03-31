'use strict';

describe('Directive: ngRequiredFile', function () {
  var compile,
    scope,
    element;

  // Load the bwwc module, which contains the directive
  beforeEach(module('bwwc'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function ($compile, $rootScope, ngModelDirective) {
    compile = $compile;
    scope = $rootScope.$new();
  }));

  beforeEach(function () {
    // Compile a piece of HTML containing the directive
    element = compile('<input type="file" ng-required-file="true" ng-required="true" ng-model="foo" />')(scope);
    // fire all the watches, so the scope expression {{label}} will be evaluated
    scope.$digest();
  });

  it('it sets the $viewValue when change is triggered', function () {
    // We can't set the file input value manually due to security restrictions
    // Instead we check that the original value is undefined
    expect(element.controller('ngModel').$viewValue).toBe(undefined);
    element.triggerHandler('change');
    // And after triggering change, the value should change to empty string (from el.val())
    expect(element.controller('ngModel').$viewValue).toBe('');
  });
});
