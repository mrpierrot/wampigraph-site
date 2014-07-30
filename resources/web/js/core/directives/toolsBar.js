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
            templateUrl: 'assets/js/core/views/directives/tools-bar.html',
            link:function($scope,$element,$attrs){

                $scope.model = {tool:'patternCreator'};
                $scope.canUndo = $scope.canRedo = false;
                $scope.$watch('drawingEngine',function(drawingEngine){
                    console.log(drawingEngine);
                    if(drawingEngine){
                        $scope.$watch('model.tool',function($newValue){
                            drawingEngine.setTool($newValue);
                            $scope.openPatternCreatorPanel  = $newValue === 'patternCreator';

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

                $scope.$watch('model.tool',function($newValue){
                    $scope.openPatternCreatorPanel  = $newValue === 'patternCreator';
                    $scope.$broadcast('DE_setTool',[$newValue]);
                });

                $scope.toolsBar_undo = function toolsBar_undo(){
                    $scope.$broadcast('DE_undo');

                }

                $scope.toolsBar_redo = function toolsBar_redo(){
                    $scope.$broadcast('DE_redo');
                }

                $scope.toolsBar_fillNotToggled = function toolsBar_fillNotToggled(){
                    $scope.$broadcast('DE_fill',[false]);
                }

                $scope.toolsBar_fillToggled = function toolsBar_fillToggled(){
                    $scope.$broadcast('DE_fill',[true]);
                }

                $scope.toolsBar_patternCreatorOK = function toolsBar_patternCreatorOK(){
                    if($scope.drawingEngine){
                       var pattern =  $scope.drawingEngine.getPattern();
                        console.log("pattern : ",pattern);
                    }
                }

                $scope.toolBar_resize = function toolBar_resize(){

                    if($scope.drawingEngine){
                        $scope.model.tool = null;
                        $scope.$broadcast('DE_clearTools');
                        $scope.toolModel = null;
                        var modalInstance = $modal.open({
                            templateUrl: 'assets/js/core/views/directives/resize-modal.html',
                            controller: ResizeModalInstanceCtrl,
                            size: 'sm',
                            resolve: {
                                dimensions:function(){
                                    return $scope.drawingEngine.getDimensions();
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