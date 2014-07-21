/**
 * Created by Pierrot on 21/07/14.
 */
define(function () {
    var clazz = function Pearl(){

    };

    var p = clazz.prototype;

    p.rendering = null;

    p._initialize = function(){
        this.rendering = new createjs.Container();
    }


    return clazz;
});