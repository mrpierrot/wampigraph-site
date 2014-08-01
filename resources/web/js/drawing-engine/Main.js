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

    return function(canvas){


        var _stage = null;
        var _engine = null;
        var _interface = null;
        var _setEnv = function DrawingEngine_setEnv(canvas){
            console.log(canvas,canvas.width,canvas.height);

            _stage = new createjs.Stage(canvas);
            _stage.snapToPixelsEnabled = true;
            _stage.mouseMoveOutside = true;
            _stage.enableMouseOver(60);
            createjs.Touch.enable(_stage);



            createjs.Ticker.addEventListener("tick",  _stage);
            createjs.Ticker.timingMode = createjs.Ticker.RAF;
            createjs.Ticker.setFPS(30);

        }

        var _setApp = function DrawingEngine_setApp(){

            var filesManager = new FilesLoaderManager([
                {id:'anchor',src:'/assets/images/drawing-engine/anchor.png'},
                {id:'pearlSprite',src:'/assets/images/drawing-engine/pearl-anim.png'},
                {id:'pearlData',src:'/assets/images/drawing-engine/pearl-anim.json'}
            ],Assets);

            filesManager.on('complete',function(){
                var data = Assets['pearlData'];
                data.images = [Assets['pearlSprite']];
                data.animations['a'] = [0];
                data.animations['b'] = [24];
                data.animations['a2b-left'] = [0,24,null];
                data.animations['b2a-left'] = [24,49,null];
                data.animations['a2b-right'] = [49,74,null];
                data.animations['b2a-right'] = [74,99,null];
                Assets.pearl = new createjs.SpriteSheet(data);


                _engine = new Engine(_stage,_stage.canvas.width,_stage.canvas.height);

                _stage.addChild(_engine.rendering);
                _interface.complete(_engine);
            },this)

        }


        _interface = {
            complete:function(engine){

            }
        }
        _setEnv(canvas);
        _setApp();

        return _interface;

    };

});
