/**
 * Created by Pierrot on 22/07/14.
 */

'use strict';

define(function () {
var i = 0;
    return function($modal,$timeout,wgMediator){
        return {
            restrict: 'E',
            templateUrl: '/assets/js/core/views/directives/wg-tools-bar.html',
            scope: {},
            link:function($scope,$element,$attrs){

                $scope.model = {tool:'brush'};
                $scope.canUndo = $scope.canRedo = false;


                wgMediator.$on('drawingEngine:historyChanged',function(event,canUndo,canRedo){
                    $timeout(function(){
                        $scope.$apply(function(){
                            $scope.canUndo = canUndo;
                            $scope.canRedo = canRedo;
                        });
                    });
                });

                wgMediator.$on('core:toolChanged',function(event,tool){
                    $scope.model.tool = tool;
                });

                $scope.$watch('model.tool',function($newValue){
                    wgMediator.$emit('wgToolbar:setTool',$newValue);


                });

                $scope.toolsBar_undo = function toolsBar_undo(){
                    wgMediator.$emit('wgToolbar:undo');

                }

                $scope.toolsBar_redo = function toolsBar_redo(){
                    wgMediator.$emit('wgToolbar:redo');
                }

                $scope.toolsBar_fillNotToggled = function toolsBar_fillNotToggled(){
                    wgMediator.$emit('wgToolbar:fill',false);
                }

                $scope.toolsBar_fillToggled = function toolsBar_fillToggled(){
                    wgMediator.$emit('wgToolbar:fill',true);
                }

                $scope.toolBar_resize = function toolBar_resize(){
                    $scope.model.tool = null;
                    console.log('toolBar_resize'+(i++));
                    wgMediator.$emit('wgToolbar:resize');

                }

                $scope.toolBar_save = function toolBar_save(){
                    wgMediator.$emit('wgToolbar:save');

                }

                $scope.toolBar_new = function toolBar_new(){
                    wgMediator.$emit('wgToolbar:new');

                }

                $scope.saveButtonWait = false;
                wgMediator.$on('core:save:init',function(){
                    $scope.saveButtonWait = true;
                });

                wgMediator.$on('core:save:complete',function(){
                    $scope.saveButtonWait = false;
                });

                wgMediator.$on('core:save:error',function(){
                    $scope.saveButtonWait = false;
                });


            },
            replace : true
        };
    };

});