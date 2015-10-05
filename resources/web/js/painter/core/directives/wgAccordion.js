/**
 * Created by Pierrot on 29/07/14.
 */
define(function () {
    return function(wgMediator){
        return {
            restrict: 'E',
            templateUrl: '/assets/js/painter/core/views/directives/wg-accordion.html',
            link:function($scope,$element,$attrs){

                $scope.status={
                    open:[false,false,false,true],
                    disabled:[true,false,false,false]
                }
                var _names = {
                    'createPattern':0,
                    'patternLib':1,
                    'wampumLib':2,
                    'infos':3
                }

                wgMediator.$on('core:openPanel',function(event,name,open,disabled){
                    var index = _names[name];
                    $scope.status.open[index] = open;
                    if(typeof disabled!="undefined")$scope.status.disabled[index] = disabled;
                })

            }
        }
    };
});