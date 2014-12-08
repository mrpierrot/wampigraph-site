/**
 * Created by Pierrot on 13/08/14.
 */
angular.module('casusludi-alerts',[]).
    factory('alerts',function(){
        console.log('alerts:create');
        var _listeners = [];
        return{
            add:function(type,msg){
                console.log('alerts:add',_listeners);
                for (var i= 0,c=_listeners.length;i<c;i++){
                    _listeners[i](type,msg);
                }
            },
            $$register:function(listener){
                var index = _listeners.indexOf(listener);
                if(index < 0)_listeners.push(listener);
            },
            $$unregister:function(listener){
                var index = _listeners.indexOf(listener);
                if(index >= 0)_listeners.splice(index,1);
            }
        }
    }).
    directive('alertsContainer',function(alerts){
        return {
            restrict: 'EA',
            replace: true,
            template: '<div class="alert-container"><alert ng-repeat="alert in alerts" type="{{alert.type}}" close="closeAlert($index)">{{alert.msg}}</alert></div>',
            $scope:{},
            link:function($scope,$element,$attrs){
                console.log('alerts-container:create');
                $scope.alerts = [

                ];

                var _addAction = function(type,msg) {
                    console.log(type,msg);
                    $scope.alerts.push({type:type,msg: msg});
                };

                alerts.$$register(_addAction);

                $scope.$on('$destroy', function() {
                    alerts.$$unregister(_addAction);
                });

                $scope.closeAlert = function(index) {
                    $scope.alerts.splice(index, 1);
                };

            }
        }
    });