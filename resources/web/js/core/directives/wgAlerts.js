/**
 * Created by Pierrot on 08/08/14.
 */
define(function () {
    return function(wgMediator){
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/assets/js/core/views/directives/wg-alerts.html',
            $scope:{},
            link:function($scope,$element,$attrs){
                $scope.alerts = [

                ];

                wgMediator.$on('alerts:add',function Core__addAlert(event,type,msg) {
                    $scope.alerts.push({type:type,msg: msg});
                });

                $scope.closeAlert = function(index) {
                    $scope.alerts.splice(index, 1);
                };

            }
        }
    };
});