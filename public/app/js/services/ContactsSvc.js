'use strict';

define(['services'], function(services){
    services.service('ContactsSvc', ['$rootScope', '$resource',
        function( $rootScope, $resource){
            var contacts = [];
            var actions = {
                getContacts: {
                    method: 'GET',
                    isArray: true
                }
            };
            return $resource('contacts', {}, actions);
        }
    ]);
});