/**
 * Created by Pierrot on 17/07/14.
 */

'use strict';

define(['angular'],function (angular) {


    return function ($scope,$http,$routeParams,wgResetPasswordModal) {
        $scope.user = {};

        $scope.roles = [
            {label:'Admin',value:'ROLE_ADMIN'},
            {label:'Modérateur',value:'ROLE_MODERATOR'},
            {label:'Péon',value:'ROLE_USER'}
        ];


        $scope.showRoles = function(user) {
            var selected = [];
            if(user.roles){
                angular.forEach($scope.roles, function(s) {
                    if (user.roles.indexOf(s.value) >= 0) {
                        selected.push(s.label);
                    }
                });
            }
            return selected.length ? selected.join(', ') : $scope.roles[2].label;
        };

        var userId = $routeParams['userId'];
        $http.get(
            '/api/user/me'
        ).success(function(data){
            $scope.user = data;
        }).error(function(){

        });

        $scope.resetPassword = function(user){
            wgResetPasswordModal().result.then(function(data){
                $http.get(
                    '/api/user/reset-password/'+user.id
                ).success(function(data){
                    if(data){
                        alerts.add('success','Le mot de passe vient d\'être envoyé par mail');
                    }else{
                        alerts.add('danger','Impossible de créer un nouveau mot de passe');
                    }

                }).error(function(){

                });
            });
        }
    };
});

