'use strict';

define(['services', 'socketio'], function(services, io){
    services.factory('AuthenticationSvc', ['$rootScope', '$window',
        function( $rootScope, $window ){
            var auth = {
                isLogged : false
            };
            return {
                auth: auth
            };
        }
    ]);
});