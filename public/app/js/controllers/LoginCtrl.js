'use strict';

define(['controllers', 'services/AuthenticationSvc', 'services/UserSvc'], function(controllers, AuthenticationSvc, UserSvc){
    controllers.controller('LoginCtrl', ['$rootScope', '$scope', '$location', '$window', 'AuthenticationSvc', 'UserSvc',
        function($rootScope, $scope, $location, $window, AuthenticationSvc, UserSvc){
            $scope.incorrectUsername = false;
            $scope.incorrectPassword = false;
            $scope.errorMessage = "";
            console.log($window);
            if( AuthenticationSvc.isLogged ) {
                $location.path('/home');
                $rootScope.$emit('LoggedIn');
            }
            $scope.login = function(username, password) {
                if( !username || !password ) {
                    if( !username ){
                        $scope.incorrectUsername = true;
                    }
                    else {
                        $scope.incorrectUsername = false;
                    }
                    if( !password ) {
                        $scope.incorrectPassword = true;
                    }
                    else {
                        $scope.incorrectPassword = false;
                    }
                    $scope.errorMessage = "login.FILL_ALL_FIELD";
                    return;
                }
                UserSvc.logIn(username, password).success(function(data){
                    $scope.incorrectUsername = false;
                    $scope.incorrectPassword = false;
                    $scope.errorMessage = "";
                    $window.localStorage.token = data.email;
                    AuthenticationSvc.isLogged = true;
                    UserSvc.user = data;
                    $rootScope.$emit('LoggedIn', data.email);
                    $location.path('/home');
                }).error(function(err) {
                    $scope.errorMessage = "login.INCORRECTLP";
                });

            };
        }
    ]);
});