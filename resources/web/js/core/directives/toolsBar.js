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
                $scope.canUndo = $scope.canRedo = false;
                $scope.$watch('drawingEngine',function(drawingEngine){
                    if(drawingEngine){
                        $scope.$watch('toolModel',function($newValue){
                            drawingEngine.setTool($newValue);
                        });
                        drawingEngine.addEventListener("historyChanged",function(){
                            console.log("historyChanged");
                            $scope.canUndo = drawingEngine.canUndo();
                            $scope.canRedo = drawingEngine.canRedo();
                            console.log($scope.canUndo,$scope.canRedo);
                            $scope.$apply();
                        });

                    }
                });

                $scope.toolsBar_undo = function toolsBar_undo(){
                    if($scope.drawingEngine){
                        $scope.drawingEngine.undo();
                    }
                }

                $scope.toolsBar_redo = function toolsBar_redo(){
                    if($scope.drawingEngine){
                        $scope.drawingEngine.redo();
                    }
                }



            },
            replace : true
        };
    };

});