'use strict';

/**
 * @ngdoc function
 * @name bwwc.controllers:SessionViewerCtrl
 * @description
 * # SessionViewerCtrl
 */
angular.module('bwwc.controllers')
  .controller('SessionViewerCtrl', ['SessionService', 'STRINGS', '$rootScope',
    function (SessionService, STRINGS, $rootScope) {

      var that = this;
      this.buttonLabel = STRINGS.GET_SESSION_PARTICIPANTS_BUTTON;
      this.participantsLoaded = false;

      $rootScope.pageTitle = STRINGS.PAGE_TITLE_SESSION_VIEWER;
      $rootScope.headerTitle = STRINGS.HEADER_TITLE_SESSION_VIEWER;
      $rootScope.headerSubtitle = STRINGS.HEADER_SUBTITLE_SESSION_VIEWER;

      this.getSessionParticipants = function (sessionID) {

        SessionService.getSessionParticipants(sessionID)
          // Both succes and error do the same but get a different callback
          .then(function successCallback(response) {
            setParticipantData(response);
          }, function errorCallback(response) {
            setParticipantData(response);
          });
      };

      function setParticipantData(response) {
        that.participantsLoaded = true;
        that.participants = response;
      }
    }]);
