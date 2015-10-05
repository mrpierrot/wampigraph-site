/**
 * Created by Pierrot on 17/07/14.
 */

'use strict';

define(['angular'],function (angular) {


    return function ($scope,$http,$routeParams,wgResetPasswordModal,wgChangePasswordModal,alerts) {
        $scope.user = {};
        $scope.req = {};

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

        $scope.changePassword = function(user){
            wgChangePasswordModal().result.then(function(data){
                $http.post(
                    '/api/user/change-my-password',
                    $.param($scope.req),
                    {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }
                ).success(function(data){
                        if(data.success){
                            alerts.add('success','Le mot de passe vient d\'être modifié');
                        }else if(data.errors){
                            alerts.add('danger',data.errors.join('<br>'));
                        }else{
                            alerts.add('danger','Une erreur interne est survenue.');
                        }

                    }).error(function(){

                    });
            });
        }
    };
});

