'use strict';

define(['services', 'socketio', 'services/SoundSvc'], function(services, io, SoundSvc){
    services.factory('TokenSvc', ['$rootScope', '$window','SoundSvc',
        function( $rootScope, $window, SoundSvc ){
            var socket = null;
            function init() {
                socket = io();
                addUser();
            }
            function initListeners() {
                socket.on('mes', function(username, message){
                    console.log(username + " >> " + message);
                    SoundSvc.play('message');
                });
            }
            function addUser() {
                socket.emit("addUser", {"email":$window.localStorage.token});
                initListeners();
            }


            return {
                sendMessage: function(contact, message) {
                    socket.emit("mes", {contact:contact, mes: message});
                },
                init: init,
                destroy: function() {
                    socket.disconnect();
                }
            };
        }
    ]);
});