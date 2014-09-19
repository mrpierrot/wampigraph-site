/**
 * Created by Pierrot on 01/08/14.
 */
define(function () {

    var ResizeModalInstanceCtrl = function ($scope, $modalInstance, dimensions) {

        $scope.dimensions = dimensions;
        $scope.data = {
            align:{vAlign:'top',hAlign:'left'}
        };

        $scope.ok = function () {
            $modalInstance.close({dim:dimensions,align:$scope.data.align});
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };

    return function($modal){
        return function(dimensions){
            return $modal.open({
                templateUrl: '/assets/js/painter/core/views/services/wg-resize-modal.html',
                controller: ResizeModalInstanceCtrl,
                size: 'sm',
                resolve: {
                    dimensions:function(){
                        return dimensions;
                    }
                }
            })
        }
    };
});