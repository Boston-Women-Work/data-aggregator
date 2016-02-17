'use strict';

/**
 * @ngdoc function
 * @name bwwc.controllers:SessionViewerCtrl
 * @description
 * # SessionViewerCtrl
 */
angular.module('bwwc.controllers')
  .controller('SessionViewerCtrl', ['SessionService', 'STRINGS', '$interval', '$rootScope',
    function (SessionService, STRINGS, $interval, $rootScope) {

      var that = this,
        stop;
      this.buttonLabel = STRINGS.GET_SESSION_PARTICIPANTS_BUTTON;
      this.participantsLoaded = false;

      $rootScope.pageTitle = STRINGS.PAGE_TITLE_SESSION_VIEWER;
      $rootScope.headerTitle = STRINGS.HEADER_TITLE_SESSION_VIEWER;
      $rootScope.headerSubtitle = STRINGS.HEADER_SUBTITLE_SESSION_VIEWER;

      /**
       * Get list of participants for a given session.
       * Calls itself continuously every 10 seconds.
       *
       * @param sessionID Session ID to get participant list for
       */
      this.getSessionParticipants = function (sessionID) {

        SessionService.getSessionParticipants(sessionID)
          // Both success and error do the same but get a different callback
          .then(function successCallback(response) {
            setParticipantData(response);
          }, function errorCallback(response) {
            setParticipantData(response);
          });

        // Don't continue if interval is already defined
        if (angular.isDefined(stop)) {
          return;
        }
        // Refresh participants every 10 seconds
        stop = $interval(function () {
          that.getSessionParticipants(sessionID);
        }, 10000);
      };

      function setParticipantData(response) {
        that.participantsLoaded = true;
        that.participants = response;
      }
    }]);
