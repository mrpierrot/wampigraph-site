/**
 * Created by Pierrot on 17/07/14.
 */

'use strict';

define(['angular'],function (angular) {


    return function ($scope,wgEngine,wgMediator,$http,$routeParams) {
        console.log("CoreController");
        /*$scope.$on("$routeUpdate", function(event, route) {
            console.log("$routeUpdate");
        });*/

        if($routeParams.id){
            $http.get(
                '/painter/api/get/'+$routeParams.id
            ).success(function(data){
                data.raw = JSON.parse(data.raw);
                for(var attr in data){
                    wgMediator.infos[attr] = data[attr];
                }
                wgMediator.$emit('core:load:complete',wgMediator.infos);
            }).error(function(){
                wgMediator.$emit('core:load:error');
                    wgMediator.$emit('alerts:add','danger','Un erreur est survenu lors de la recuperation du wampum');
            });
        }



    };
});

