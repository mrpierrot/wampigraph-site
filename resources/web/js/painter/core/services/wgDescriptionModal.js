/**
 * Created by Pierrot on 01/08/14.
 */
define(function () {

    var DrescriptionModalInstanceCtrl = function ($scope, $modalInstance, data,forbiddenTitles) {


        $scope.data = data;

        $scope.errors = null;

        $scope.ok = function () {
            if(!$scope.data.title){
                $scope.errors = "Veuillez saisir un titre";
                return;
            }

            if($scope.data.title.length < 5){
                $scope.errors = "Veuillez saisir un titre de 5 lettres ou plus";
                return;
            }

            if(forbiddenTitles.indexOf($scope.data.title.toUpperCase())>=0){
                $scope.errors = "Veuillez saisir un titre valide ( 'Nouveau Wampum', 'nouveau motif' ne sont pas acceptés )";
            }else{
                $modalInstance.close(data);

            }

        };


    };

    return function($modal){
        return function(data,forbiddenTitles){
            return $modal.open({
                templateUrl: '/assets/js/painter/core/views/services/wg-description-modal.html',
                controller: DrescriptionModalInstanceCtrl,
                size: 'sm',
                resolve: {
                    data:function(){
                        return data;
                    },
                    forbiddenTitles:function(){
                        return forbiddenTitles;
                    }
                }
            })
        }
    };
});