'use strict';

/**
 * @ngdoc function
 * @name bwwc.controllers:ClientCtrl
 * @description
 * # ClientCtrl
 */
angular.module('bwwc.controllers')
  .controller('ClientCtrl', ['ClientService',
    function (ClientService) {

      var tableData = ClientService.getTableData();
      this.data = tableData.data;

      console.log('client.js controller');
    }]);
