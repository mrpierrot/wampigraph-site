/**
 * Created by Pierrot on 21/07/14.
 */
define(function () {
    var clazz = function Pearl(width,height){
        this._initialize(width,height);
    };

    var p = clazz.prototype;

    p.rendering = null;
    p._shape = null;
    p._isToggle = true;


    p._initialize = function Pearl__initialize(width,height){
        this._width = width;
        this._height = height;
        this.rendering = new createjs.Container();
        this._shape = new createjs.Shape();
        this.rendering.addChild(this._shape);
        this.toggle();
    }


    p.toggle = function Pearl_toggle(){
        this._isToggle = !this._isToggle;
        this._shape.graphics.c().f(this._isToggle?"#FF00FF":"#FF0000").dr(0,0,this._width,this._height).ef();
    }

    return clazz;
});