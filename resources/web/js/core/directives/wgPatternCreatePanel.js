/**
 * Created by Pierrot on 29/07/14.
 */
define(function () {
    return function(wgMediator){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/assets/js/core/views/directives/wg-pattern-create-panel.html',
            link:function($scope,$element,$attrs){

                $scope.savePattern = function(){
                    wgMediator.$emit('patternCreate');
                }


            }
        }
    };
});