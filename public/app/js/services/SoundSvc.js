'use strict';

define(['services'], function(services){
    services.service('SoundSvc', ['$rootScope',
        function($rootScope){
            var mes_sound = new Audio("app/sounds/new_mes.mp3");

            return {
                play: function(sound) {
                    switch(sound){
                        case 'message': mes_sound.play(); break;
                        default : console.log("Incorrect sound"); break;
                    }
                },
                enableMobileSound: function() {
                    mes_sound.volume = 0;
                    mes_sound.play();
                    mes_sound.pause();
//                    sound.currentTime = 0;
                    mes_sound.volume = 1;
                }
            };
        }
    ]);
});