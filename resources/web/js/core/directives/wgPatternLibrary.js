/**
 * Created by Pierrot on 29/07/14.
 */
define(function () {
    return function($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/assets/js/core/views/directives/wg-pattern-library.html',
            scope:{},
            link:function($scope,$element,$attrs){
                 var index =0;
                 $http.get('/painter/api/lib/pattern/'+index).success(function(data){
                    $scope.assets = data;
                    $scope.model = {selection:null} ;
                 }).error(function(){

                 });

                $scope.$watch('model.selection',function(value){
                    console.log(value);
                });

            }
        }
    };
});