'use strict';
define([
    'angular',
    'config',
    'filters',
    'services',
    'directives',
    'controllers',
    'angularRoute',
    'angularResource',
    'socketio',
    'angularFileUpload',
    'controllers/RootCtrl',
    'controllers/AuthCtrl',
    'controllers/VideoCtrl',
    'directives/profile-menu/et-profile-menu',
    'ngI18next'
], function(angular, config) {
    var app = angular.module('evadaTalk',[
        'ngRoute',
        'ngResource',
        'ui.bootstrap',
        'evadaTalk.filters',
        'evadaTalk.services',
        'evadaTalk.directives',
        'evadaTalk.controllers',
        'jm.i18next',
        'angularFileUpload'
    ]);
    var ENV = config.DEVELOPMENT;
    app.constant('config', ENV);

    angular.module('jm.i18next').config(['$i18nextProvider',
        function($i18nextProvider) {
            $i18nextProvider.options = {
                lng: ENV.localeSupported[0],
                useCookie: true,
                useLocalStorage: false,
                fallbackLng: false,
                resGetPath: 'locales/__lng__/localization.json',
                preload: ENV.localeSupported,
                load: 'current',
                debug: false,
                postAsync: true
            };
        }
    ]);
    return app;
});