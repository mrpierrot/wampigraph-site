/**
 * Created by Pierrot on 01/08/14.
 */
define(function () {

    var ResizeModalInstanceCtrl = function ($scope, $modalInstance, dimensions) {
        console.log(dimensions);

        $scope.dimensions = dimensions;
        $scope.align = {vAlign:'top',hAlign:'left'};


        $scope.ok = function () {
            $modalInstance.close({dim:dimensions,align:$scope.align});
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };

    return function($modal){
        return function(dimensions){
            return $modal.open({
                templateUrl: '/assets/js/core/views/services/wg-resize-modal.html',
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