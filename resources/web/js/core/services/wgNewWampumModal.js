/**
 * Created by Pierrot on 01/08/14.
 */
define(function () {

    var NewWampumModalInstanceCtrl = function ($scope, $modalInstance) {

        $scope.ok = function () {
            $modalInstance.close(true);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };

    return function($modal){
        return function(){
            return $modal.open({
                templateUrl: '/assets/js/core/views/services/wg-new-wampum-modal.html',
                controller: NewWampumModalInstanceCtrl
            })
        }
    };
});