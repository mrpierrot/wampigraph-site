/**
 * Created by Pierrot on 17/07/14.
 */

'use strict';

define(['angular'],function (angular) {

    return function ($scope,$http,$routeParams) {

        $scope.req = {};
        $scope.errors = {};
        var userOnSubmit = false;
        $scope.userSubmit = function(){
            if(!userOnSubmit) {
                userOnSubmit = true;
                console.log($scope.req);
                $http.post(
                    '/api/user/register',
                    $.param($scope.req),
                    {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }
                ).success(function (data) {
                    userOnSubmit = false;
                        if(data.errors){
                            $scope.errors = data.errors;
                        }else{

                        }

                }).error(function () {
                    userOnSubmit = false;
                });
            }
        }
    };
});

