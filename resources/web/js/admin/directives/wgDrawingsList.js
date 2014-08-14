/**
 * Created by Pierrot on 13/08/14.
 */
define(function () {
    return function(roles,$filter,$http){
        return {
            restrict: 'E',
            templateUrl: '/assets/js/admin/views/directives/wg-drawings-list.html',
            link:function($scope,$element,$attrs){
                var index = 0;
                $scope.items = [];

                $scope.statuses = [
                    {value:1,label:'Brouillon'},
                    {value:2,label:'proposé'},
                    {value:3,label:'En-ligne'},
                    {value:8,label:'Supprimé'}
                ]

                $scope.showStatus = function(drawing) {
                    var selected = $filter('filter')($scope.statuses, {value: drawing.status});
                    return (drawing.status && selected.length) ? selected[0].label : 'Not set';
                };

                $scope.getType = function(drawing) {
                    return (drawing.type == 'wampum')?'wampum':'motif';
                };

                $scope.updateTitle = function(drawing,title){
                    return $http.post(
                        '/api/drawing/update-field',
                        $.param({
                            id:drawing.id,
                            name:'title',
                            value:title
                        }),
                        {
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }
                    ).success(function(data){

                    }).error(function(){

                    });
                }


                $scope.updateDescription = function(drawing,description){
                    return $http.post(
                        '/api/drawing/update-field',
                        $.param({
                            id:drawing.id,
                            name:'description',
                            value:description
                        }),
                        {
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }
                    ).success(function(data){

                        }).error(function(){

                        });
                }

                $scope.delete = function(drawing){
                    return $http.get(
                        '/admin/api/drawing/delete/'+drawing.id
                    ).success(function(data){
                            drawing.status = 8;
                    }).error(function(){

                    });
                }

                $scope.validate = function(drawing){
                    return $http.get(
                            '/admin/api/drawing/validate/'+drawing.id
                    ).success(function(data){
                            drawing.status = 3;
                    }).error(function(){

                    });
                }

                $scope.restore = function(drawing){
                    return $http.get(
                            '/api/drawing/restore/'+drawing.id
                        ).success(function(data){
                            drawing.status = 1;
                        }).error(function(){

                        });
                }

                $scope.suggest = function(drawing){
                    return $http.get(
                            '/api/drawing/suggest/'+drawing.id
                        ).success(function(data){
                            drawing.status = 2;
                        }).error(function(){

                        });
                }

                $scope.updateStatus = function(drawing,status){
                    return $http.get(
                        '/admin/api/drawing/update-status/'+drawing.id+'/'+status
                    ).success(function(data){

                    }).error(function(){

                    });
                }

                $attrs.$observe('items',function(value){
                    var items = JSON.parse(value);
                    for(var i= 0,c=items.length;i<c;i++){
                         items[i].status = parseInt(items[i].status);
                         items[i].update_date = Date.parse(items[i].update_date);
                    }

                    $scope.items = items;
                })

            }
        }
    };
});