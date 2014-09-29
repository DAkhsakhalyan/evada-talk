'use strict';

define(['controllers', "services/ContactsSvc",'services/TokenSvc'], function(controllers) {
    controllers.controller('ContactsCtrl', ['$rootScope','$scope', 'ContactsSvc', 'TokenSvc',
        function($rootScope, $scope, ContactsSvc, TokenSvc) {
            $scope.contacts = ContactsSvc.getContacts();
            $scope.call = function(contact) {
                console.log(contact);
                $rootScope.$emit('makeCall', contact);
            };
            $scope.sendMessage = function(contact) {
                TokenSvc.sendMessage(contact, "Hey");
                console.log(contact);
            };
        }
    ]);
});