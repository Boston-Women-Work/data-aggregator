'use strict';

angular.module('bwwc.strings')
  .constant('STRINGS', {
    PAGE_TITLE_INDEX: 'Boston Women\'s Workforce Council',
    HEADER_TITLE_INDEX: 'Workforce Survey',
    HEADER_SUBTITLE_INDEX: 'Boston Women\'s Workforce Council',
    PAGE_TITLE_SESSION_GENERATOR: 'Trusted Party Live Session Generator',
    HEADER_TITLE_SESSION_GENERATOR: 'Trusted Party',
    HEADER_SUBTITLE_SESSION_GENERATOR: 'Secure Session Generator',
    PAGE_TITLE_SESSION_VIEWER: 'Trusted Party Live Session Tracker',
    HEADER_TITLE_SESSION_VIEWER: 'Trusted Party',
    HEADER_SUBTITLE_SESSION_VIEWER: 'Live Session Tracker',
    GENERATE_SESSION_ERROR: 'Error! Failed to store public key on server. Please try again.',
    GENERATE_SESSION_BUTTON_NORMAL: 'Generate Session',
    GENERATE_SESSION_BUTTON_LOADING: 'Loading...',
    GET_SESSION_PARTICIPANTS_BUTTON: 'Get Participants',
    GET_SESSION_PARTICIPANTS_ERROR: 'Failed to retrieve participants, please try again later.'
  });
