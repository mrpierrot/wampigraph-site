define(['drawing-engine/Main'],function (drawingEngine) {
    'use strict';

    return function($window){
        return {
            restrict: 'E',
            template: '<canvas></canvas>',
            link:function($scope,$element,$attrs){


                var resizeStrategie = null
                switch($attrs['data-size-type']){
                    case 'max-space':
                        resizeStrategie = function(){
                            //$element.width();

                        };
                        break;
                    default:
                        resizeStrategie = function(){};
                        break;
                }
                resizeStrategie();
                $($window).bind('resize',resizeStrategie);

                var engine = drawingEngine($element[0]);

            },
            replace : true
        };
    };

});
