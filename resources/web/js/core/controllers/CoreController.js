/**
 * Created by Pierrot on 17/07/14.
 */

'use strict';

define(['angular'],function (angular) {


    return function ($scope,$window,$timeout,wgMediator,wgResizeModal) {

        wgMediator.$on('drawingEngine:ready',function(event,engine){

            engine.on('historyChanged',function(){
                wgMediator.$emit('drawingEngine:historyChanged',engine.canUndo(),engine.canRedo());
            });

            wgMediator.$on('wgToolbar:setTool',function(event,tool){
                engine.setTool(tool);
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

            engine.setTool('brush');
        });

    };
});

