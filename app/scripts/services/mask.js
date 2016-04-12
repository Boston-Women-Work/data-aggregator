(function (isNode, isAngular) {
  'use strict';

  var MaskService = function () {
    var mask = {};


    mask.aggregate = function (data, includeCounts, db) {

      var fields,
        counts = {},
        agg = {};

      if (db) {
        fields = function (x) {
          return x.fields;
        };
      } else {
        fields = function (x) {
          return x;
        };
      }

      // Ensure we are always working with an array.
      // if (db) {
      //   var arr = [];
      //   for (var row in data) {
      //     arr.push(data[row]);
      //   }
      //   data = arr;
      // }

      // Set initial values to 0
      for (var key in fields(data[0])) {
        counts[key] = 0;
        agg[key] = 0;
      }

      // Add up all data
      data.forEach(function (el, i) {
        for (key in counts) {
          var field = parseInt(fields(data[i])[key]);

          // Only count if data is non-zero
          counts[key] += (field > 0) ? 1 : 0;
          agg[key] += field;
        }
      });

      // Add the counts of non-zero data if requested
      if (includeCounts) {
        for (key in fields(data[0])) {
          agg[key + '_count'] = counts[key];
        }
      }

      return agg;
    };

    return mask;
  };

  /* istanbul ignore else  */
  if (isAngular) {
    // AngularJS module definition
    angular.module('bwwc.services').factory('MaskService', [MaskService]);
  } else if (isNode) {
    // NodeJS module definition
    module.exports = MaskService;
  }

})(typeof module !== 'undefined' && module.exports,
  typeof angular !== 'undefined');
