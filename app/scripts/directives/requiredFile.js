'use strict';

/**
 * ng-required doesn't work for file input, this fixes that.
 */
angular.module('bwwc.directives')
  .directive('ngRequiredFile', [function () {
    return {
      require: 'ngModel',
      link: function (scope, el, attrs, ngModel) {
        //change event is fired when file is selected
        el.bind('change', function () {
          scope.$apply(function () {
            ngModel.$setViewValue(el.val());
            ngModel.$render();
          });
        });
      }
    };
  }]);
