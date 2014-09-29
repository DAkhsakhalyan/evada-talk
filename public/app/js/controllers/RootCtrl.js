'use strict';

define(['controllers', 'services/LocaleSvc', 'services/UserSvc', 'services/AuthenticationSvc', 'services/SoundSvc', 'lodash'], function(controllers, LocaleSvc, UserSvc,  AuthenticationSvc, SoundSvc, _){
    controllers.controller('RootCtrl', ['$rootScope', '$scope', '$location', 'config', 'LocaleSvc', 'UserSvc', 'AuthenticationSvc', 'SoundSvc',
        function($rootScope, $scope, $location, config, LocaleSvc, UserSvc, AuthenticationSvc, SoundSvc){
            $scope.locales = [];
            $scope.selectedLocale = {};
            $scope.loaded = false;
            $scope.isLogged = false;
            $scope.isMobile = false;
            $rootScope.$on("LoggedIn", function() {
                $scope.isLogged = true;
                if( $location.path() === "/home" || $location.path() === "/login" ) {
                    $scope.smallMenu = false;
                    $scope.menu[0].visible = false;
                    $scope.selectedMenu = "";
                }
                else {
                    $scope.smallMenu = true;
                }
                if( detectMob() ) {
                    $scope.isMobile = true;
                }
            });
            $scope.accept = function() {
                $scope.isMobile = false;
                SoundSvc.enableMobileSound();
            };
            $rootScope.$on("LoggedOut", function() {
                $scope.isLogged = false;
                $scope.smallMenu = false;
            });
            $scope.smallMenu = false;

            LocaleSvc.getLocales(function(locales){
                $scope.locales = locales;
                $scope.selectedLocale = LocaleSvc.getCurrentLocale();
            });
            $scope.onLocaleChange = function(locale) {
                $scope.selectedLocale = locale;
                LocaleSvc.switchLocale(locale);
            };
            $scope.selectedMenu = $location.path() === '/home' || $location.path() === '/login' ? "" : $location.path().slice(1);
            $scope.menu = [
                {
                    'title': 'home.HOME',
                    'id' :'home',
                    'visible': $location.path() === '/home' || $location.path() === '/login' || $location.path() === '' ? false : true
                },
                {
                    'title': 'home.CONTACTS',
                    'id' :'contacts',
                    'visible': true
                },
                {
                    'title': 'home.HISTORY',
                    'id' :'history',
                    'visible': true
                },
                {
                    'title': 'home.MESSAGES',
                    'id' :'messages',
                    'visible': true
                }
            ];
            $scope.selectMenu = function(item) {
                $scope.selectedMenu = item.id;

                if( item.id === "home" ) {
                    _.map($scope.menu, function(item) {
                        if( item.id === 'home' ) {
                            item.visible = false;
                        }
                    });
                    $scope.smallMenu = false;
                }
                else if( $location.path() === "/home" ) {
                    _.map($scope.menu, function(item) {
                        if( item.id === 'home' ) {
                            item.visible = true;
                        }
                    });
                    $scope.smallMenu = true;
                }
                $location.path(item.id);
            };
            $rootScope.$on('$viewContentLoaded', function(event) {
                // NProgress is loaded as a global variable. See comment in main.js line: 3.
                $scope.loaded = true;
            });
            function detectMob() {
                if( navigator.userAgent.match(/Android/i)
                    || navigator.userAgent.match(/iPhone/i)
                    || navigator.userAgent.match(/iPad/i)
                    || navigator.userAgent.match(/Windows Phone/i)
                    ){
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    ]);
});