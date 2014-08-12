/**
 * Created by Pierrot on 17/07/14.
 */

'use strict';

define(['angular'],function (angular) {


    return function ($scope,$http) {
        $scope.wampums = [];
        $http.get(
            '/admin/api/mes-wampums'
        ).success(function(data){
            for(var i= 0,c=data.length;i<c;i++){
                $scope.wampums.push(data[i]);
            }

        }).error(function(){
            wgMediator.$emit('core:load:error');
            wgMediator.$emit('alerts:add','danger','Un erreur est survenu lors de la recuperation du wampum');
        });

    };
});

