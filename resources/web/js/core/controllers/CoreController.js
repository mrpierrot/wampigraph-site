/**
 * Created by Pierrot on 17/07/14.
 */

'use strict';

define(['angular'],function (angular) {


    return function ($scope,$window,$timeout) {
        $window = $($window);

        var resize = function(){
            $scope.windowHeight = $window.height()-51;
            $scope.windowWidth = $window.width();
            console.log($scope.windowWidth,$scope.windowHeight);
        }
        $window.bind('resize',function(){
            $timeout(function(){
                $scope.$apply(resize);
            });
        });
        resize();

    };
});

