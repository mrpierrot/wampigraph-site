/**
 * Created by Pierrot on 17/07/14.
 */

'use strict';

define(['angular'],function (angular) {


    return function ($scope,$http) {
        $scope.drawings = [];

        var onLoad = false;
        $scope.addMoreItems = function(){
            if(!onLoad){
                var index = $scope.drawings.length;
                onLoad = true;
                $http.get('/admin/api/drawing/list/pattern/status/2/'+index).success(function(data){
                    onLoad = false;
                    for(var i= 0,c=data.length;i<c;i++){
                        $scope.drawings.push(data[i]);
                    }
                }).error(function(){
                    onLoad = false;
                });
            }

        }

    };
});

