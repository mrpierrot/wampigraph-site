/**
 * Created by Pierrot on 29/07/14.
 */
define(function () {
    return function(wgMediator){
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/assets/js/core/views/directives/wg-accordion.html',
            link:function($scope,$element,$attrs){

                $scope.status={
                    open:[false,false,false,true],
                    disabled:[true,false,false,false]
                }


                wgMediator.$on('core:createPatternMode',function(event,value){
                    $scope.status.open[0] = value;
                    $scope.status.disabled[0] = !value;
                })

            }
        }
    };
});