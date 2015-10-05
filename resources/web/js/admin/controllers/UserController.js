/**
 * Created by Pierrot on 17/07/14.
 */

'use strict';

define(['angular'],function (angular) {


    return function ($scope,$http,$routeParams) {
        $scope.users = [];
        var userId = $routeParams['userId'];
        $http.get(
            '/api/user/'+userId
        ).success(function(data){
            $scope.users = [data];
        }).error(function(){

        });

    };
});

