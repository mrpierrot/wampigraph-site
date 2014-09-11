/**
 * Created by Pierrot on 29/07/14.
 */
define(function () {
    return function($http,wgMediator){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/assets/js/painter/core/views/directives/wg-pattern-library.html',
            scope:{},
            link:function($scope,$element,$attrs){

                $scope.assets = [];
                $scope.req = {};
                $scope.model = {
                    selection:null
                };

                $scope.$watch('model.selection',function(value){
                    console.log(value);
                    wgMediator.$emit('wgPercentHeight:update');
                    wgMediator.$emit('patternLib:selection',value);
                });

                var onLoad = false;
                $scope.loadPatterns = function(){
                    if(!onLoad){
                        _update();
                    }
                }

                $scope.update = function(){
                    console.log("update : ", $scope.req);
                    $scope.assets = [];
                    _update();
                }

                var _update = function(){
                    var index = $scope.assets.length;
                    $http.post(
                        '/painter/api/lib/pattern/'+index,
                        $.param($scope.req),
                        {
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }
                    ).success(function(data){
                            onLoad = false;
                            for(var i= 0,c=data.length;i<c;i++){
                                $scope.assets.push(data[i]);
                            }
                    }).error(function(){
                        onLoad = false;
                    });
                }

            }
        }
    };
});