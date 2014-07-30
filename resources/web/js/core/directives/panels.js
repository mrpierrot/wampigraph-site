/**
 * Created by Pierrot on 29/07/14.
 */
define(function () {
    return function(){
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'assets/js/core/views/directives/panels.html',
            link:function($scope,$element,$attrs){
                console.log($scope);
                $scope.patternCreatorPanelVisible = false;
                $scope.patternCreatorPanelOpened = false;
                $scope.$watch('openPatternCreatorPanel',function(value){
                    $scope.patternCreatorPanelVisible = value;
                    $scope.patternCreatorPanelOpened = value;
                })

            }
        }
    };
});