/**
 * Created by Pierrot on 21/07/14.
 */

'use strict';

define([
    'easeljs',
    './engine/Engine'
    ],function (easelsjs,Engine) {


    var _stage = null;
    var _engine = null;
    var _setEnv = function DrawingEngine_setEnv(canvas){
        console.log(canvas);
        _stage = new createjs.Stage(canvas);
        _stage.snapToPixelsEnabled = true;
        _stage.mouseMoveOutside = true;
        _stage.enableMouseOver(30);
        createjs.Touch.enable(_stage);



        createjs.Ticker.addEventListener("tick",  _stage);
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.setFPS(60);

        console.log(_stage);
    }

    var _setApp = function DrawingEngine_setApp(){
        _engine = new Engine(_stage);

        _stage.addChild(_engine.rendering);
    }

    return function(canvas){

        _setEnv(canvas);
        _setApp();

        return _engine;

    };

});
