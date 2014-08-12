/**
 * Created by Pierrot on 29/07/14.
 */
define(function () {
    return function(wgMediator){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/assets/js/painter/core/views/directives/wg-wampum-infos-panel.html',
            scope:{},
            link:function($scope,$element,$attrs){
                $scope.infos = wgMediator.infos;

                wgMediator.$watch('infos',function(value){
                    $scope.infos
                })

            }
        }
    };
});