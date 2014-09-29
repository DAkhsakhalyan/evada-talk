'use strict';

define(['controllers'], function(controllers){
    controllers.controller('VideoCtrl', ['$rootScope', '$scope', '$location',
        function($rootScope, $scope, $location) {
            $scope.isVisible = false;
            $rootScope.$on("makeCall", function(e, contact){
                console.log(contact);
                $scope.isVisible = true;
                navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;

                navigator.getUserMedia({ audio: true, video: true }, gotStream, streamError);
                function gotStream(stream) {
                    document.querySelector('video').src = URL.createObjectURL(stream);
                }

                function streamError(error) {
                    alert("Error");
                }
            });
        }
    ]);
});