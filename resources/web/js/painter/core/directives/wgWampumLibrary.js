/**
 * Created by Pierrot on 29/07/14.
 */
define(function () {
    return function($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/assets/js/painter/core/views/directives/wg-wampum-library.html',
            link:function($scope,$element,$attrs){

                $scope.assets = [];
                $scope.req = {};
                $scope.loadWampums = function(){
                    _update();
                }

                $scope.update = function(){
                    console.log("update : ", $scope.req);
                    $scope.assets = [];
                    _update();
                }

                var _update = function(){
                    var index = $scope.assets.length;
                    $http.post(
                        '/painter/api/lib/wampum/'+index,
                        $.param($scope.req),
                        {
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }
                    ).success(function(data){
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