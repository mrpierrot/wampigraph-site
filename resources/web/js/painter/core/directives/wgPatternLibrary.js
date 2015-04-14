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


                $scope.loadPatterns = function(){
                        _update();
                }

                $scope.update = function(){
                    console.log("update : ", $scope.req);
                    $scope.assets = [];
                    _update();
                }

                var loading = false;
                var _update = function(){
                    if(!loading) {
                        loading = true;
                        var index = $scope.assets.length;
                        $http.post(
                            '/painter/api/lib/pattern/' + index,
                            $.param($scope.req),
                            {
                                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                            }
                        ).success(function (data) {

                                for (var i = 0, c = data.length; i < c; i++) {
                                    $scope.assets.push(data[i]);
                                }
                                loading = false;
                            }).error(function () {
                                loading = false;
                            });
                    }
                }

            }
        }
    };
});