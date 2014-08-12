/**
 * Created by Pierrot on 17/07/14.
 */

'use strict';

define(['angular'],function (angular) {


    return function ($scope,wgEngine,wgMediator,$http,$routeParams,$route) {

        var _changeDrawing = function(dId){
            if(dId){
                console.log("_changeDrawing:"+dId);
                $http.get(
                        '/painter/api/get/'+dId
                ).success(function(data){
                    try{
                        data.raw = JSON.parse(data.raw);
                        for(var attr in data){
                            wgMediator.infos[attr] = data[attr];
                        }
                        wgMediator.$emit('core:load:complete',wgMediator.infos);
                    }catch(e){
                        console.log(e);
                        wgMediator.$emit('alerts:add','danger',"Ce wampum n'existe pas ou il contient des erreurs");
                    }

                }).error(function(){
                    wgMediator.$emit('core:load:error');
                    wgMediator.$emit('alerts:add','danger','Un erreur est survenu lors de la recuperation du wampum');
                });
            }
        }

         var lastRoute = $route.current;
         $scope.$on('$locationChangeSuccess', function(event) {
             _changeDrawing($route.current.params.id);
            $route.current = lastRoute;
         });

        _changeDrawing($routeParams.id);
    };
});

