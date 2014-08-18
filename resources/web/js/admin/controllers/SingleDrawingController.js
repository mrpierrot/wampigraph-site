/**
 * Created by Pierrot on 17/07/14.
 */

'use strict';

define(['angular'],function (angular) {


    return function ($scope,$http,$routeParams,alerts) {
        $scope.drawings = [];

        $http.get('/api/drawing/'+$routeParams['id']).success(function(data){
            $scope.drawings.push(data);

        }).error(function(){
            alerts.add('danger','Wampum non trouvé ou action non autorisée.');
        });


    };
});

