'use strict';
require.config({
    paths: {
        angular: '../bower_components/angular/angular',
        angularRoute: '../bower_components/angular-route/angular-route',
        angularResource: '../bower_components/angular-resource/angular-resource',
        angularCookies: '../bower_components/angular-cookies/angular-cookies',
        ngAudio : '../bower_components/angular-audio/angular.audio',
        angularFileUpload: '../bower_components/ng-file-upload/angular-file-upload.min',
        angularFileUploadShim: '../bower_components/ng-file-upload/angular-file-upload-shim.min',
        i18next: '../bower_components/i18next/i18next',
        ngI18next: '../bower_components/ng-i18next/dist/ng-i18next',
        angularBootstrap: '../bower_components/angular-bootstrap/ui-bootstrap',
        angularBootstrapTemplates: '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
        less: '../bower_components/less/dist/less-1.7.3.min',
        jquery: '../bower_components/jquery/dist/jquery.min',
        lodash: "../bower_components/lodash/dist/lodash",
        modernizr: "../bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min",
        socketio: '../bower_components/socket.io-client/socket.io'
    },
    shim :{
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'ngAudio': ['angular'],
        'angularResource': ['angular'],
        'angularFileUpload': ['angularFileUploadShim', 'angular'],
        'angularRoute': ['angular'],
        'angularCookies': {
            deps: ['angular']
        },
        'angularBootstrap': {
            deps: ['angular', 'angularBootstrapTemplates']
        },
        'angularBootstrapTemplates': {
            deps: ['angular']
        },
        'ngI18next': {
            deps: ['angular', 'angularCookies', 'i18next']
        }
    },
    priority: [
        "angular"
    ]
});

window.name = "NG_DEFER_BOOTSTRAP!";

require([
    'angular',
    'app',
    'routes',
    'angularBootstrap',
    'less'
], function(angular, app, routes) {
    var $html = angular.element(document.getElementsByTagName('html')[0]);

    angular.element().ready(function() {
        angular.resumeBootstrap([app['name']]);
    });
});