/**
 * Created by Pierrot on 17/07/14.
 */

'use strict';

define(['angular'],function (angular) {


    return function ($scope,$http) {
        $scope.users = [];
        $scope.req = {};

        var onLoad = false;
        $scope.addMoreItems = function(){

            _updateList();
        }

        $scope.search = function(){
            $scope.users = [];
            _updateList();
        }

        var _updateList = function(){
            if(!onLoad){
                var index = $scope.users.length;
                onLoad = true;
                $http.post(
                    '/api/user/list/'+index,
                    $.param($scope.req),
                    {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }
                ).success(function(data){
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

