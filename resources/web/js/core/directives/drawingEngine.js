
'use strict';

define(['drawing-engine/Main'],function (drawingEngine) {


    return function($window){
        return {
            restrict: 'E',
            templateUrl: 'assets/js/core/views/directives/drawing-engine.html',
            link:function($scope,$element,$attrs){
                $scope.drawingEngine_scrollX = 0;
                $scope.drawingEngine_scrollY = 1000;

                var root = $($element[0]);
                var canvas = $('canvas',root).get(0);
                var hSlide = $('.h-slide',root);
                var vSlide = $('.v-slide',root);

                var de = drawingEngine(canvas);
                de.complete = function(engine){


                    $scope.drawingEngine = {};
                    for (var name in engine){
                        var attr = engine[name];
                        if(name[0]!=='_' && typeof(attr) === 'function'){
                            $scope.drawingEngine[name] = attr.bind(engine);
                            $scope.$on('DE_'+name,function(event,data){
                                var action = event.name.split('_')[1];
                                engine[action].apply(engine,data);
                            });
                        }
                    }


                    $scope.$watch('drawingEngine_scrollX',function(value){
                        //console.log('drawingEngine_scrollX',value);
                        engine.moveViewport($scope.drawingEngine_scrollX/1000,1-($scope.drawingEngine_scrollY/1000));
                    });
                    $scope.$watch('drawingEngine_scrollY',function(value){
                        //console.log('drawingEngine_scrollY',value);
                        engine.moveViewport($scope.drawingEngine_scrollX/1000,1-($scope.drawingEngine_scrollY/1000));
                    });

                    $attrs.$observe('width',function(value){
                        console.log('data-width',value,$attrs);
                        value = value || 800;
                        root.width(value);
                        canvas.width = value-vSlide.width();
                        hSlide.width(canvas.width);
                        engine.updateViewport(value);

                    });
                    $scope.$watch('windowHeight',function(value){
                        console.log('data-height',value);
                        value = value || 600;
                        root.height(value);
                        canvas.height = value-hSlide.height();
                        $('.slide',vSlide).height(canvas.height-40);
                        engine.updateViewport(null,value);

                    });


                }



            },
            replace : true
        };
    };

});
