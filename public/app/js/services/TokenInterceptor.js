'use strict';

define(['services', 'services/AuthenticationSvc'], function(services, AuthenticationSvc){
    services.factory('TokenInterceptor', ['$rootScope','$q', '$window', '$location', 'AuthenticationSvc',
        function($rootScope, $q, $window, $location, AuthenticationSvc){
            return {
                request: function (config) {
                    config.headers = config.headers || {};
                    if ($window.localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
                    }
                    return config;
                },

                requestError: function(rejection) {
                    return $q.reject(rejection);
                },

                /* Set Authentication.isAuthenticated to true if 200 received */
                response: function (response) {
                    if (response != null && response.status == 200 && $window.localStorage.token && !AuthenticationSvc.isLogged) {
                        AuthenticationSvc.isLogged = true;
                        $rootScope.$emit('LoggedIn', $window.localStorage.token);
                    }
                    return response || $q.when(response);
                },

                /* Revoke client authentication if 401 is received */
                responseError: function(rejection) {
                    if (rejection != null && rejection.status === 401 && ($window.localStorage.token || AuthenticationSvc.isLogged)) {
                        delete $window.localStorage.token;
                        AuthenticationSvc.isLogged = false;
                        $location.path("login");
                    }

                    return $q.reject(rejection);
                }
            };
        }
    ]);
});