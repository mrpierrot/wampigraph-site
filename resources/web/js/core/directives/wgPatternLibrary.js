/**
 * Created by Pierrot on 29/07/14.
 */
define(function () {
    return function($http,wgMediator){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/assets/js/core/views/directives/wg-pattern-library.html',
            scope:{},
            link:function($scope,$element,$attrs){
                 var index =0;
                 $scope.assets = [];

                $scope.$watch('model.selection',function(value){
                    console.log(value);
                    wgMediator.$emit('wgPercentHeight:update');
                    wgMediator.$emit('patternLib:selection',value);
                });

                $scope.loadPatterns = function(){
                    console.log('loadPatterns');
                    index = $scope.assets.length;
                    $http.get('/painter/api/lib/pattern/'+index).success(function(data){
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