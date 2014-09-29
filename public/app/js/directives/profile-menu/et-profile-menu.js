define(['directives', 'jquery'], function(directives, $){
    directives.directive('etProfileMenu', ['$window', function() {
        return {
            restrict: 'E',
            scope: {
                user: '=',
                action: "&"
            },
            link: function(scope, element, attrs) {
                var $profile_photo = $("#profile_photo"),
                    $profile_menu = $(element).find('.profile_menu');
                $("#profile_photo").on('click', function(e) {
                    $profile_menu.toggle();
                    e.stopPropagation();
                    if( $profile_menu.css('display') === "block" ) {
                        $(document).on("click", function() {
                            $profile_menu.hide();
                        });
                    }
                    else {
                        $(document).unbind("click");
                    }

                });

          },
          replace: true,
          templateUrl: 'app/js/directives/profile-menu/et-profile-menu.html'
        };
    }]);
});