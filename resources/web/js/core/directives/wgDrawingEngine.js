
'use strict';

define(['drawing-engine/Main'],function (drawingEngine) {


    return function($window,wgMediator,wgContentSize){
        return {
            restrict: 'E',
            templateUrl: '/assets/js/core/views/directives/wg-drawing-engine.html',
            scope:{},
            link:function($scope,$element,$attrs){
                $scope.drawingEngine_scrollX = 0;
                $scope.drawingEngine_scrollY = 1000;

                var root = $($element[0]);
                var canvas = $('canvas',root).get(0);
                var hSlide = $('.h-slide',root);
                var vSlide = $('.v-slide',root);
                var _engine = null;
                var _raw = null;
                wgMediator.$on('core:load:complete',function(event,infos){
                    _raw = infos.raw;
                    _loadDrawing();
                });

                var _loadDrawing = function(){
                    //console.log("_loadDrawing",_engine,_raw)
                    if(_engine && _raw){

                        _engine.load(_raw);
                    }
                }

                var de = drawingEngine(canvas);
                de.complete = function(engine){
                    console.log('emit:drawingEngine:ready');
                    _engine = engine;
                    _loadDrawing();
                    wgMediator.$emit('drawingEngine:ready',engine);

                    $scope.$watch('drawingEngine_scrollX',function(value){
                        engine.moveViewport($scope.drawingEngine_scrollX/1000,1-($scope.drawingEngine_scrollY/1000));
                    });

                    $scope.$watch('drawingEngine_scrollY',function(value){
                        engine.moveViewport($scope.drawingEngine_scrollX/1000,1-($scope.drawingEngine_scrollY/1000));
                    });

                    var updateWidth = function(value){
                        //console.log('data-width',value);
                        value = value || 800;
                        value -=338;
                        root.width(value);
                        canvas.width = value-vSlide.width();
                        hSlide.width(canvas.width);
                        engine.updateViewport(value);

                    }

                    var updateHeight = function(value){
                        //console.log('data-height',value);
                        value = value || 600;
                        value -=32;
                        root.height(value);
                        canvas.height = value-hSlide.height();
                        $('.slide',vSlide).height(canvas.height-40);
                        engine.updateViewport(null,value);

                    }

                    wgContentSize.$watch('width',updateWidth);
                    wgContentSize.$watch('height',updateHeight);
                    updateWidth(wgContentSize.width);
                    updateHeight(wgContentSize.height);




                }



            },
            replace : true
        };
    };

});
