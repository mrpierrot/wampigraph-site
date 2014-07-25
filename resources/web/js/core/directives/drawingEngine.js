
'use strict';

define(['drawing-engine/Main'],function (drawingEngine) {

    var _updateSize =  function drawingEngine_updateSize(newValue){

    };
    return function($window){
        return {
            restrict: 'E',
            template: '<div><div class="drawing-engine-viewport"><canvas></canvas></div></div>',
            transclude: true,
            link:function($scope,$element,$attrs){

                var de = drawingEngine($('canvas',$element[0]).get(0));

                de.complete = function(engine){
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
                }


            },
            replace : true
        };
    };

});
