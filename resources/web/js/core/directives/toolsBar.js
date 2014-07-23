/**
 * Created by Pierrot on 22/07/14.
 */

'use strict';

define(function () {


    return function(){
        return {

            restrict: 'E',
            transclude: true,
            templateUrl: 'assets/js/core/views/directives/tools-bar.html',
            link:function($scope,$element,$attrs){

                $scope.toolModel = 'brush';
                $scope.$watch('toolModel',function($newValue){
                    if($scope.drawingEngine){
                        $scope.drawingEngine.setTool($newValue);
                    }

                });

            },
            replace : true
        };
    };

});