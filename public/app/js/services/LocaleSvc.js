'use strict';

define(['services', 'lodash'], function(services, _) {
    services.service('LocaleSvc', ['$rootScope', 'config', '$i18next',
        function($rootScope, config, $i18next) {
            function mapOne(localeName) {
                return {
                    key: localeName,
                    translation: $i18next('header.' + localeName)
                };
            }
            function mapLocales(locales) {
                return _.map(locales, function(localeName){
                   return mapOne(localeName);
                });
            }

            return {
                getLocales: function(callback) {
                    var supportedLocales = config.localeSupported;
                    $rootScope.$on('i18nextLanguageChange', function() {
                        callback(mapLocales(supportedLocales));
                    });
                },
                getCurrentLocale: function() {
                    return mapOne($i18next.options.lng);
                },
                switchLocale: function(language) {
                    var lang_key = language && language.key;
                    if (lang_key) {
                        $i18next.options.lng = lang_key;
                    }
                }
            };
        }
    ]);
});