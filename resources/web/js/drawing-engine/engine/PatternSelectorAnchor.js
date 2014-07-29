/**
 * Created by Pierrot on 29/07/14.
 */

define(['../Assets','easeljs'],function (Assets) {

    var clazz = function PatternSelectorAnchor(stage){
        this._initialize(stage);
    };

    var p = clazz.prototype;

    p.rendering = null,
    p.bounds,
    p._stage;

    p._initialize = function PatternSelectorAnchor__initialize(stage){
        this._stage = stage;
        this.rendering = new createjs.Bitmap(Assets.anchor);
        this.bounds = this.rendering.getBounds();
    }

    p._pressUpHandler = function PatternSelectorAnchor__pressUpHandler() {

    }

    p._pressMoveHandler = function PatternSelectorAnchor__pressMoveHandler(){

    }

    p.setPosition =  function PatternSelectorAnchor_setPosition(x,y){
        this.rendering.x = x-this.bounds.width*0.5;
        this.rendering.y = y-this.bounds.height*0.5;
    }


    return clazz;
});
