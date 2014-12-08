/**
 * Created by Pierrot on 01/08/14.
 */
define(function () {

    var ResetPasswordModalInstanceCtrl = function ($scope, $modalInstance) {

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
                templateUrl: '/assets/js/admin/views/services/wg-reset-password-modal.html',
                controller: ResetPasswordModalInstanceCtrl
            })
        }
    };
});