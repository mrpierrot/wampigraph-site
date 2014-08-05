/**
 * Created by Pierrot on 29/07/14.
 */
define(function () {
    return function(wgMediator,wgInfos){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/assets/js/core/views/directives/wg-wampum-infos-panel.html',
            scope:{},
            link:function($scope,$element,$attrs){
                $scope.infos = wgInfos;
            }
        }
    };
});