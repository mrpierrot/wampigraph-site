/**
 * Created by Pierrot on 13/08/14.
 */
define(function () {
    return function(roles,$filter,$http){
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
                ]

                /*$http.get(
                        '/admin/api/roles'
                    ).success(function(data){
                        $scope.roles = data;
                    }).error(function(){

                    });*/

                $scope.statuses = [
                    {value:1,label:'Actif'},
                    {value:2,label:'Banni'},
                    {value:8,label:'Supprimé'}
                ]

                $scope.showStatus = function(user) {
                    var selected = $filter('filter')($scope.statuses, {value: user.status});
                    return (user.status && selected.length) ? selected[0].label : 'Inconnu';
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
                    console.log('roles:',roles);
                   /* return $http.post(
                        '/api/user/update-roles',
                        $.param({
                            id:user.id,
                            value:roles
                        }),
                        {
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }
                    );*/
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
                            '/api/user/restore/'+user.id
                        ).success(function(data){
                            user.status = 1;
                        }).error(function(){

                        });
                }


                $attrs.$observe('items',function(value){
                    var items = JSON.parse(value);
                    for(var i= 0,c=items.length;i<c;i++){
                         items[i].status = parseInt(items[i].status);
                         //items[i].update_date = Date.parse(items[i].update_date);
                    }

                    $scope.items = items;
                })

            }
        }
    };
});