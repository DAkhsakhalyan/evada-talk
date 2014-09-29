'use strict';

define(['services'], function(services){
    services.factory('UserSvc', ['$rootScope', '$http',
        function($rootScope, $http) {
            var user = {};
            return {
                logIn : function (username, password) {
                    return $http.post('/login', {'username': username, 'password': password});
                },
                getUser: function(username) {
                    return $http.post('/profile', {'username': username});
                },
                logOut : function() {
                    user = {};
                },
                user : user
            };
        }
    ]);
});