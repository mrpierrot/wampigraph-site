/**
 * Created by Pierrot on 13/08/14.
 */
define(function () {
    return function(roles,$filter,$http,$timeout,alerts,wgResetPasswordModal){
        return {
            restrict: 'E',
            templateUrl: '/assets/js/admin/views/directives/wg-users-list.html',
            link:function($scope,$element,$attrs){
                var index = 0;
                $scope.items = [];

                $scope.roles = [
                    {label:'Admin',value:'ROLE_ADMIN'},
                    {label:'Modérateur',value:'ROLE_MODERATOR'},
                    {label:'Péon',value:'ROLE_USER'}
                ];


                $scope.showRoles = function(user) {
                    var selected = [];
                    angular.forEach($scope.roles, function(s) {
                        if (user.roles.indexOf(s.value) >= 0) {
                            selected.push(s.label);
                        }
                    });
                    return selected.length ? selected.join(', ') : $scope.roles[2].label;
                };

                var _updateField = function(user,fieldname,value){
                    return $http.post(
                        '/admin/api/user/update-field',
                        $.param({
                            id:user.id,
                            name:fieldname,
                            value:value
                        }),
                        {
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }
                    );
                }
                $scope.updateFirstname = function(user,value){return _updateField(user,'firstname',value);}
                $scope.updateLastname = function(user,value){return _updateField(user,'lastname',value);}
                $scope.updateEmail = function(user,value){return _updateField(user,'email',value);}



                $scope.updateRoles = function(user,roles){

                    return $http.post(
                        '/admin/api/user/update-roles',
                        $.param({
                            id:user.id,
                            roles:roles
                        }),
                        {
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }
                    )
                    return true;
                }

                $scope.delete = function(user){
                    return $http.get(
                        '/admin/api/user/delete/'+user.id
                    ).success(function(data){
                            user.status = 8;
                    }).error(function(){

                    });
                }

                $scope.restore = function(user){
                    return $http.get(
                            '/admin/api/user/restore/'+user.id
                        ).success(function(data){
                            user.status = 1;
                        }).error(function(){

                        });
                }

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


                $attrs.$observe('items',function(value){
                    var items = JSON.parse(value);
                    for(var i= 0,c=items.length;i<c;i++){
                        items[i].status = parseInt(items[i].status);
                    }

                    $scope.items = items;
                })



            }
        }
    };
});