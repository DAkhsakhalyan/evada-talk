'use strict';

define([
    'angular',
    'app',
    'controllers/LoginCtrl',
    'controllers/HomeCtrl',
    'controllers/ContactsCtrl',
    'services/AuthenticationSvc',
    'services/TokenInterceptor'
], function(angular, app) {
    app.run(function($rootScope, $location, $window, AuthenticationSvc) {
        $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
            if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredLogin
                && !AuthenticationSvc.isLogged && !$window.localStorage.token) {
                $location.path("login");
            }
        });
    });
    return app.config(['$routeProvider', '$httpProvider',
        function($routeProvider, $httpProvider) {
            $httpProvider.interceptors.push('TokenInterceptor');
            $routeProvider.when('/login', {
                templateUrl: 'app/partials/login.html',
                controller: 'LoginCtrl',
                access: {requiredLogin: false}
            });
            $routeProvider.when('/home', {
                templateUrl: 'app/partials/home.html',
                controller: 'HomeCtrl',
                access: {requiredLogin: true}
            });
            $routeProvider.when('/contacts', {
                templateUrl: 'app/partials/contacts.html',
                controller: 'ContactsCtrl',
                access: {requiredLogin: true}
            });
            $routeProvider.otherwise({
                redirectTo: 'home'
            });
        }
    ]);
});