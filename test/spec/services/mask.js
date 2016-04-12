'use strict';

describe('Service: MaskService', function () {
  var MaskService,
    data;

  beforeEach(module('bwwc'));

  beforeEach(inject(function ($injector) {
    // Get session service
    MaskService = $injector.get('MaskService');
  }));


  describe('aggregate masks without db', function () {

    beforeEach(function () {
      data = [{
        "Female_Executive_Hispanic": "5",
        "Female_Executive_White": "3",
        "Female_Executive_Black": "0"
      }, {
        "Female_Executive_Hispanic": "2",
        "Female_Executive_White": "3",
        "Female_Executive_Black": "0"
      }, {
        "Female_Executive_Hispanic": "3",
        "Female_Executive_White": "6",
        "Female_Executive_Black": "1"
      }];
    });

    it('should add mask values', function () {
      var aggregate = MaskService.aggregate(data);
      var expectedResult = {
        "Female_Executive_Hispanic": 10,
        "Female_Executive_White": 12,
        "Female_Executive_Black": 1
      };
      expect(aggregate).toEqual(expectedResult);
    });

    it('should not add count when includeCounts is false', function () {
      var aggregate = MaskService.aggregate(data, false);
      var expectedResult = {
        "Female_Executive_Hispanic": 10,
        "Female_Executive_White": 12,
        "Female_Executive_Black": 1
      };
      expect(aggregate).toEqual(expectedResult);
    });

    it('should count number of non-zero values when includeCounts is true', function () {
      var aggregate = MaskService.aggregate(data, true);
      var expectedResult = {
        "Female_Executive_Hispanic": 10,
        "Female_Executive_Hispanic_count": 3,
        "Female_Executive_White": 12,
        "Female_Executive_White_count": 3,
        "Female_Executive_Black": 1,
        "Female_Executive_Black_count": 1
      };
      expect(aggregate).toEqual(expectedResult);
    });
  });

  describe('aggregate masks with db', function () {

    beforeEach(function () {
      data = [{
        fields: {
          "Female_Executive_Hispanic": "5",
          "Female_Executive_White": "3",
          "Female_Executive_Black": "0"
        }
      }, {
        fields: {
          "Female_Executive_Hispanic": "2",
          "Female_Executive_White": "3",
          "Female_Executive_Black": "0"
        }
      }, {
        fields: {
          "Female_Executive_Hispanic": "3",
          "Female_Executive_White": "6",
          "Female_Executive_Black": "1"
        }
      }];
    });
    
    it('should add mask values', function () {
      var aggregate = MaskService.aggregate(data, false, true);
      var expectedResult = {
        "Female_Executive_Hispanic": 10,
        "Female_Executive_White": 12,
        "Female_Executive_Black": 1
      };
      expect(aggregate).toEqual(expectedResult);
    });

    it('should count number of non-zero values when includeCounts is true', function () {
      var aggregate = MaskService.aggregate(data, true, true);
      var expectedResult = {
        "Female_Executive_Hispanic": 10,
        "Female_Executive_Hispanic_count": 3,
        "Female_Executive_White": 12,
        "Female_Executive_White_count": 3,
        "Female_Executive_Black": 1,
        "Female_Executive_Black_count": 1
      };
      expect(aggregate).toEqual(expectedResult);
    });

  });
});
