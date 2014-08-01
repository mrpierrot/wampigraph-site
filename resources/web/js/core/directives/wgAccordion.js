/**
 * Created by Pierrot on 29/07/14.
 */
define(function () {
    return function(){
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/assets/js/core/views/directives/wg-accordion.html',
            link:function($scope,$element,$attrs){

                $scope.status={
                    open:[false,true,false],
                    disabled:[true,false,false]
                }


                $scope.$watch('openPatternCreatorPanel',function(value){
                    $scope.status.open[0] = value;
                    $scope.status.disabled[0] = !value;
                })

            }
        }
    };
});