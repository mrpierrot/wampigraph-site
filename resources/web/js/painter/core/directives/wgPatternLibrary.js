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
                 var index =0;
                 $scope.assets = [];
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
                    console.log('loadPatterns');
                    if(!onLoad){
                        index = $scope.assets.length;
                        onLoad = true;
                        $http.get('/painter/api/lib/pattern/'+index).success(function(data){
                            onLoad = false;
                            console.log(data);
                            for(var i= 0,c=data.length;i<c;i++){
                                $scope.assets.push(data[i]);
                            }

                        }).error(function(){
                            onLoad = false;
                        });
                    }

                }

            }
        }
    };
});