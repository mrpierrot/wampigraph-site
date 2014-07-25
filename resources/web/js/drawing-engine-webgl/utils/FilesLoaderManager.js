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
