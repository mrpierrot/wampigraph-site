/**
 * Created by Pierrot on 17/07/14.
 */

'use strict';

define(['angular'],function (angular) {


    return function ($scope,$window,$timeout,wgMediator,wgResizeModal,wgInfos,$http) {

        wgMediator.$on('drawingEngine:ready',function(event,engine){

            engine.on('historyChanged',function(){
                wgMediator.$emit('drawingEngine:historyChanged',engine.canUndo(),engine.canRedo());
            });

            wgMediator.$on('wgToolbar:setTool',function(event,tool){
                engine.setTool(tool);
                wgMediator.$emit('core:createPatternMode',tool === 'patternCreator');
            });

            wgMediator.$on('wgToolbar:undo',function(){
                engine.undo();
            });

            wgMediator.$on('wgToolbar:redo',function(){
                engine.redo();
            });

            wgMediator.$on('wgToolbar:fill',function(event,toggled){
                engine.fill(toggled);
            });

            wgMediator.$on('wgToolbar:resize',function(){
                engine.clearTools();
                var modalInstance = wgResizeModal(engine.getDimensions());
                modalInstance.result.then(function (data) {
                    engine.setSize(data.dim.cols,data.dim.rows,data.align.vAlign,data.align.hAlign);
                }, function () {

                });
            });

            wgMediator.$on('wgToolbar:save',function(){
                wgMediator.$emit('core:save:init');
                var raw = engine.getData();
                $http.post('/painter/api/save',{raw:raw,infos:wgInfos}).success(function(data){
                    wgMediator.$emit('core:save:complete');
                }).error(function(){
                    wgMediator.$emit('core:save:error');
                });
            });

            engine.setTool('brush');
        });

    };
});

