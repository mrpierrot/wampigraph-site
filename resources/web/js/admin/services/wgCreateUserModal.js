/**
 * Created by Pierrot on 01/08/14.
 */
define(function () {

    var CreateUserModalInstanceCtrl = function ($scope, $modalInstance) {

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
                templateUrl: '/assets/js/admin/views/services/wg-create-user-modal.html',
                controller: CreateUserModalInstanceCtrl
            })
        }
    };
});