/**
 * Created by Pierrot on 17/07/14.
 */

'use strict';

define(['angular'],function (angular) {


    return function ($scope,$window,$timeout,wgMediator,wgResizeModal,$http,$routeParams) {

        if($routeParams.id){
            $http.get(
                '/painter/api/get/'+$routeParams.id
            ).success(function(data){
                console.log("get : ",data);
                data.raw = JSON.parse(data.raw);
                for(var attr in data){
                    wgMediator.infos[attr] = data[attr];
                }
                wgMediator.$emit('core:load:complete',wgMediator.infos);
            }).error(function(){
                wgMediator.$emit('core:load:error');
                _addAlert('danger','Un erreur est survenu lors de la recuperation du wampum');
            });
        }

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
                wgMediator.infos.raw = JSON.stringify(engine.getData());
                console.log(wgMediator.infos);
                $http.post(
                    '/painter/api/save',
                    $.param(wgMediator.infos),
                    {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }
                 ).success(function(data){
                    wgMediator.infos.id = data.id;
                    wgMediator.$emit('core:save:complete');
                }).error(function(){
                    wgMediator.$emit('core:save:error');
                    _addAlert('danger','Un erreur est survenu lors de la sauvegarde du wampum');
                });
            });

            wgMediator.$on('pattern:create',function(event,infos){
                wgMediator.$emit('pattern:save:init');
                infos.raw = JSON.stringify(engine.getPattern());
                $http.post(
                    '/painter/api/save',
                    $.param(infos),
                    {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }
                ).success(function(data){
                    infos.id = data.id;
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

