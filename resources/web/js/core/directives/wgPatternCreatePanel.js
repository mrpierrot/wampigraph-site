/**
 * Created by Pierrot on 29/07/14.
 */
define(function () {
    return function(wgMediator){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/assets/js/core/views/directives/wg-pattern-create-panel.html',
            scope:{},
            link:function($scope,$element,$attrs){

                $scope.infos = {
                    title: "Nouveau motif",
                    description: ""
                }
                $scope.savePattern = function(){
                    wgMediator.$emit('pattern:create',$scope.infos);
                }


            }
        }
    };
});