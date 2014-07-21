/**
* Created by Pierrot on 21/07/14.
*/
define([
    './Pearl'
    ],function () {
    var clazz = function Engine(){
        this._initialize();
    };

    var p = clazz.prototype;

    p.rendering = null;

    p._initialize = function(){
        this.rendering = new createjs.Container();

        var test = new createjs.Text("lol","10px Arial","#000000");

        this.rendering.addChild(test);

    }


    return clazz;
});