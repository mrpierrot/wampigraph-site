/**
 * Created by Pierrot on 29/07/14.
 */
define(function () {
    return function($http){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/assets/js/core/views/directives/wg-library-panel.html',
            link:function($scope,$element,$attrs){
                 var type = $attrs['type'] || 'wampum';
                 var index =0;
                 $http.get('/painter/api/lib/'+type+'/'+index).success(function(data){
                    $scope.assets = data;
                 }).error(function(){

                 });


            }
        }
    };
});