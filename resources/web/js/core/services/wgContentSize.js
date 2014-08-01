/**
 * Created by Pierrot on 01/08/14.
 */
define(function () {
    return function($rootScope,$window,$timeout){

        var $scope = $rootScope.$new(true);
        $scope.width = 800;
        $scope.height = 600;

        var $core = $('.core');
        $window = $($window);
        var resize = function(){
            $scope.height = $core.height();
            $scope.width = $core.width();
            $timeout(function(){
                $scope.$apply();
            });
        }
        $window.bind('resize',function(){
            resize()
        });
        resize();
        return $scope;
    };
});