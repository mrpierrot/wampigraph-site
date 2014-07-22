define(['drawing-engine/Main'],function (drawingEngine) {
    'use strict';

    var _updateSize =  function drawingEngine_updateSize(newValue){

    };
    return function($window){
        return {
            restrict: 'E',
            template: '<canvas></canvas>',
            transclude: true,
            link:function($scope,$element,$attrs){

                var engine = drawingEngine($element[0]);

                $attrs.$observe('width',_updateSize);
                $attrs.$observe('height',_updateSize);

                $scope.drawingEngine = {};
                for (var name in engine){
                    var attr = engine[name];

                    if(name[0]!=='_' && typeof(attr) === 'function'){
                        console.log(name);
                        $scope.drawingEngine[name] = attr.bind(engine);
                    }


                }
            },
            replace : true
        };
    };

});
