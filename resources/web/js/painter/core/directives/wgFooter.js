/**
 * Created by Pierrot on 08/08/14.
 */
define(function () {
    return function(wgMediator){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/assets/js/painter/core/views/directives/wg-footer.html',
            $scope:{},
            link:function($scope,$element,$attrs){

                $scope.message = "";
                wgMediator.$on('footer:message',function(event,message,url){

                    $scope.url = url;
                    $scope.message = message;

                });

                wgMediator.$on('footer:clear',function(event,message,url){

                    $scope.url = null;
                    $scope.message = null;

                })
            }
        }
    };
});