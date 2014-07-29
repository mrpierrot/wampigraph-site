/**
 * Created by Pierrot on 22/07/14.
 */

'use strict';

define(function () {


    var ResizeModalInstanceCtrl = function ($scope, $modalInstance, dimensions) {
        console.log(dimensions);

        $scope.dimensions = dimensions;
        $scope.align = {vAlign:'top',hAlign:'left'};


        $scope.ok = function () {
            $modalInstance.close({dim:dimensions,align:$scope.align});
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };


    return function($modal,$timeout){
        return {

            restrict: 'E',
            transclude: true,
            templateUrl: 'assets/js/core/views/directives/tools-bar.html',
            link:function($scope,$element,$attrs){

                $scope.toolModel = 'patternCreator';
                $scope.canUndo = $scope.canRedo = false;
                $scope.$watch('drawingEngine',function(drawingEngine){
                    if(drawingEngine){
                        $scope.$watch('toolModel',function($newValue){
                            drawingEngine.setTool($newValue);
                        });
                        drawingEngine.addEventListener("historyChanged",function(){
                            console.log("historyChanged");
                            $timeout(function(){
                                $scope.$apply(function(){
                                    $scope.canUndo = drawingEngine.canUndo();
                                    $scope.canRedo = drawingEngine.canRedo();
                                });
                            });


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

                $scope.toolsBar_fillNotToggled = function toolsBar_fillNotToggled(){
                    if($scope.drawingEngine){
                        $scope.drawingEngine.fill(false);
                    }
                }

                $scope.toolsBar_fillToggled = function toolsBar_fillToggled(){
                    if($scope.drawingEngine){
                        $scope.drawingEngine.fill(true);
                    }
                }

                $scope.toolBar_resize = function toolBar_resize(){

                    if($scope.drawingEngine){
                        var modalInstance = $modal.open({
                            templateUrl: 'assets/js/core/views/directives/resize-modal.html',
                            controller: ResizeModalInstanceCtrl,
                            size: 'sm',
                            resolve: {
                                dimensions:function(){
                                    return $scope.drawingEngine.getDimensions();
                                }
                            }
                        });

                        modalInstance.result.then(function (data) {
                            //console.log(data,$scope.drawingEngine);
                            $scope.drawingEngine.setSize(data.dim.cols,data.dim.rows,data.align.vAlign,data.align.hAlign);
                            //$scope.drawingEngine.setSize(20,5,'','');
                        }, function () {
                            //$log.info('Modal dismissed at: ' + new Date());
                        });
                    }

                }



            },
            replace : true
        };
    };

});