/**
 * Created by Pierrot on 17/07/14.
 */

'use strict';

define(['angular'],function (angular) {


    return function ($scope,$window,$timeout,wgMediator,wgResizeModal,wgInfos,$http) {

        $scope.alerts = [
        ];

        var _addAlert = function Core__addAlert(type,msg) {
            $scope.alerts.push({type:type,msg: msg});
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

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
                console.log(wgInfos);
                $http.post('/painter/api/save',{raw:raw,infos:wgInfos}).success(function(data){
                    wgMediator.$emit('core:save:complete');
                }).error(function(){
                    wgMediator.$emit('core:save:error');
                    _addAlert('danger','Un erreur est survenu lors de la sauvegarde du wampum');
                });
            });

            wgMediator.$on('pattern:create',function(event,infos){
                wgMediator.$emit('pattern:save:init');
                var raw = engine.getPattern();
                console.log(infos);
                $http.post('/painter/api/pattern/save',{raw:raw,infos:infos}).success(function(data){
                    wgMediator.$emit('pattern:save:complete');
                }).error(function(){
                    wgMediator.$emit('pattern:save:error');
                    _addAlert('danger','Un erreur est survenu lors de la sauvegarde du motif');
                });
            });

            engine.setTool('brush');
        });

    };
});

