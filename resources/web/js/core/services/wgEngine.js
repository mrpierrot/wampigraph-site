/**
 * Created by Pierrot on 01/08/14.
 */
define(function () {
    return function(wgMediator,wgResizeModal,$http){

        wgMediator.$on('core:load:complete',function(event,infos){
            console.log("core:load:complete",infos);
            if(infos.original_id){
                wgMediator.$emit('footer:message','Voir la source','#/'+infos.original_id);
            }else{
                wgMediator.$emit('footer:clear');
            }

        });

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
                    console.log('wgToolbar:resize');
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
                            wgMediator.$emit('alerts:add','danger','Un erreur est survenu lors de la sauvegarde du wampum');
                        });
                });

                wgMediator.$on('pattern:create',function(event,infos){
                    wgMediator.$emit('pattern:save:init');
                    infos.raw = JSON.stringify(engine.getPattern());
                    infos.type = 'pattern';
                    infos.original_id = wgMediator.infos.id || null;

                    $http.post(
                        '/painter/api/save',
                        $.param(infos),
                        {
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }
                    ).success(function(data){
                            infos.id = data.id;
                            engine.clearTools();
                            wgMediator.$emit('core:createPatternMode',false);
                            wgMediator.$emit('pattern:save:complete');
                            wgMediator.$emit('footer:message','Editer le motif "'+infos.title+'"','#/'+infos.id);
                        }).error(function(){
                            wgMediator.$emit('pattern:save:error');
                            wgMediator.$emit('alerts:add','danger','Un erreur est survenu lors de la sauvegarde du motif');
                        });
                });

                engine.setTool('brush');


        });



        return {

        };
    };
});