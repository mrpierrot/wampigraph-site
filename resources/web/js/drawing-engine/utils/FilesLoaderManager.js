/**
 * Created by Pierrot on 20/06/14.
 */


'use strict';

define(['easeljs'],function () {
    var clazz = function FilesLoaderManager(files,Assets){
        this._initialize(files,Assets);
    };

    var p = clazz.prototype = new createjs.EventDispatcher();

    p._files = null;


    p._initialize = function (files,Assets) {
        var queue = new createjs.LoadQueue(true);
        this._files = files;
        queue.on("fileload",function(event){
            Assets[event.item.id] = event.result;
        },this);
        queue.on("complete",function(event){
            var data = Assets['pearlData'];
            data.images = [Assets['pearlSprite']];
            data.animations['a'] = [0];
            data.animations['b'] = [24];
            data.animations['a2b-left'] = [0,24,null];
            data.animations['b2a-left'] = [24,49,null];
            data.animations['a2b-right'] = [49,74,null];
            data.animations['b2a-right'] = [74,99,null];
            Assets.pearl = new createjs.SpriteSheet(data);
            this.dispatchEvent(event,this);
        },this);
        queue.on("progress",function(event){
            this.dispatchEvent(event,this);
        },this)

        for(var i in this._files){
            var file = this._files[i];
            queue.loadFile(file);
        }
    }


    return clazz;
});
