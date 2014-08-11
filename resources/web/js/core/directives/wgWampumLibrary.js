/**
 * Created by Pierrot on 29/07/14.
 */
define(function () {
    return function($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/assets/js/core/views/directives/wg-wampum-library.html',
            link:function($scope,$element,$attrs){
                 var index =0;
                $scope.assets = [];
                $scope.loadWampums = function(){
                    index = $scope.assets.length;
                    $http.get('/painter/api/lib/wampum/'+index).success(function(data){
                        console.log(data);
                        for(var i= 0,c=data.length;i<c;i++){
                            $scope.assets.push(data[i]);
                        }

                    }).error(function(){

                    });
                }
            }
        }
    };
});