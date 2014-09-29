'use strict';

define(['controllers', 'services/UserSvc', 'services/AuthenticationSvc', 'services/TokenSvc'], function(controllers) {
    controllers.controller('AuthCtrl', ['$rootScope', '$scope', '$window', '$location' , 'UserSvc', 'AuthenticationSvc', 'TokenSvc',
        function($rootScope, $scope, $window, $location, UserSvc, AuthenticationSvc,TokenSvc) {
            $scope.isLogged = false;
            $scope.user = {
                name : "",
                imgPath: ""
            };
            $scope.logOut = function() {
                UserSvc.logOut();
                AuthenticationSvc.isLogged = false;
                delete $window.localStorage.token;
                $location.path("login");
                TokenSvc.destroy();
                $rootScope.$emit('LoggedOut');
                $scope.isLogged = false;
                $scope.user = {
                    name : "",
                    imgPath: ""
                };

            };
            $rootScope.$on("LoggedIn", function(e, username) {
                UserSvc.getUser(username).success(function(data){
                    $scope.user = data;
                });
                TokenSvc.init();
                $scope.isLogged = true;
            });
        }
    ]);
});