'use strict';

/**
 * @ngdoc function
 * @name bwwc.controllers:ViewSessionCtrl
 * @description
 * # ViewSessionCtrl
 */
angular.module('bwwc.controllers')
  .controller('ViewSessionCtrl', ['SessionService', 'STRINGS', '$interval', '$rootScope',
    function (SessionService, STRINGS, $interval, $rootScope) {

      var that = this,
        stop;
      this.buttonLabel = STRINGS.GET_SESSION_PARTICIPANTS_BUTTON;

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
          .then(function (response) {
            if (response.error) {
              that.participants = undefined;
              that.errorMsg = response.error;
              // Stop timer if it was already running
              $interval.cancel(stop);
            } else {
              that.errorMsg = undefined;
              that.participants = response;
            }

            // Don't continue if interval is already defined
            if (angular.isDefined(stop) || that.errorMsg) {
              return;
            }
            // Refresh participants every 10 seconds
            stop = $interval(function () {
              that.getSessionParticipants(sessionID);
            }, 10000);
          });
      };
    }]);
