define(['easeljs'],function (easeljs) {
    'use strict';

    return function(){
        return {
            restrict: 'E',
            template: '<canvas></canvas>',
            link:function($scope,$element,$attrs){
                console.log($element);


                var stage = new createjs.Stage($element[0]);
                stage.snapToPixelsEnabled = true;
                stage.mouseMoveOutside = true;
                stage.enableMouseOver(30);
                createjs.Touch.enable(stage);

            },
            replace : true
        };
    };

});
