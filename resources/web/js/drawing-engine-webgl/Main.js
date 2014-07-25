/**
 * Created by Pierrot on 21/07/14.
 */

'use strict';

define([
    'easeljs',
    'gsap',
    'PreloadJS',
    './engine/Engine',
    './utils/FilesLoaderManager',
    './Assets'
    ],function (easeljs,gsap,PreloadJS,Engine,FilesLoaderManager,Assets) {


    var _stage = null;
    var _engine = null;
    var _interface = null;
    var _setEnv = function DrawingEngine_setEnv(canvas){
        console.log(canvas);
        _stage = new createjs.SpriteStage(canvas);
        _stage.snapToPixelsEnabled = true;
        _stage.mouseMoveOutside = true;
        _stage.enableMouseOver(60);
        createjs.Touch.enable(_stage);



        createjs.Ticker.addEventListener("tick",  _stage);
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.setFPS(20);

    }

    var _setApp = function DrawingEngine_setApp(){

        var filesManager = new FilesLoaderManager([
            {id:'pearl',src:'assets/images/drawing-engine/pearl.png'}
        ],Assets);

        filesManager.on('complete',function(){
            _engine = new Engine(_stage);

            _stage.addChild(_engine.rendering);
            _interface.complete(_engine);
        },this)

    }

    return function(canvas){

        _interface = {
            complete:function(engine){

            }
        }
        _setEnv(canvas);
        _setApp();

        return _interface;

    };

});
