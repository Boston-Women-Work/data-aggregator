'use strict';

angular.module('bwwc.strings')
  .constant('STRINGS', {
    /* Main */
    PAGE_TITLE_INDEX: 'Boston Women\'s Workforce Council',
    HEADER_TITLE_INDEX: 'Workforce Survey',
    HEADER_SUBTITLE_INDEX: 'Boston Women\'s Workforce Council',
    /* Session generator */
    PAGE_TITLE_SESSION_GENERATOR: 'Trusted Party Live Session Generator',
    HEADER_TITLE_SESSION_GENERATOR: 'Trusted Party',
    HEADER_SUBTITLE_SESSION_GENERATOR: 'Secure Session Generator',
    GENERATE_SESSION_ERROR: 'Error! Failed to store public key on server. Please try again.',
    GENERATE_SESSION_BUTTON_NORMAL: 'Generate Session',
    GENERATE_SESSION_BUTTON_LOADING: 'Loading...',
    /* Session Viewer */
    PAGE_TITLE_SESSION_VIEWER: 'Trusted Party Live Session Tracker',
    HEADER_TITLE_SESSION_VIEWER: 'Trusted Party',
    HEADER_SUBTITLE_SESSION_VIEWER: 'Live Session Tracker',
    GET_SESSION_PARTICIPANTS_BUTTON: 'Get Participants',
    GET_SESSION_PARTICIPANTS_ERROR: 'Failed to retrieve participants, please try again later.',
    /* Unmask */
    PAGE_TITLE_UNMASK: 'Trusted Party Data Unmasker',
    HEADER_TITLE_UNMASK: 'Trusted Party',
    HEADER_SUBTITLE_UNMASK: 'Aggregate Data Unmasker',
    GET_SESSION_MASKS_ERROR: 'Failed to retrieve session masks.'
  });
