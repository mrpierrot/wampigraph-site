/**
 * Created by Pierrot on 17/07/14.
 */

'use strict';

define(['angular'],function (angular) {


    return function ($scope,$http) {
        $scope.users = [];


        var onLoad = false;
        $scope.addMoreItems = function(){
            if(!onLoad){
                var index = $scope.users.length;
                onLoad = true;
                $http.get('/api/user/list/'+index).success(function(data){
                    onLoad = false;
                    for(var i= 0,c=data.length;i<c;i++){
                        $scope.users.push(data[i]);
                    }
                }).error(function(){
                    onLoad = false;
                });
            }

        }
    };
});

