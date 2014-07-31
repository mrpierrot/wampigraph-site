/**
 * Created by Pierrot on 17/07/14.
 */

'use strict';

define(['angular'],function (angular) {


    return function ($scope,$window,$timeout) {
        $window = $($window);
        $window.bind('resize',function(){
            $timeout(function(){
                $scope.$apply(function(){
                    $scope.windowHeight = $window.height();
                    $scope.windowWidth = $window.width();
                    console.log(windowWidth,windowHeight);
                });
            });
        });
        $scope.windowHeight = $window.height();
        $scope.windowWidth = $window.width();

    };
});

