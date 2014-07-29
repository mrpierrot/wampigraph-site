/**
 * Created by Pierrot on 29/07/14.
 */

define([
    '../Assets',
    './Const',
    'easeljs'
],function (Assets,Const) {

    var clazz = function PatternSelectorAnchor(container,type){
        this._initialize(container,type);
    };

    var p = clazz.prototype;

    p.rendering = null,
    p.bounds,
    p._stage,
    p._type,
    p._startX,
    p._startY,
    p._startBounds,
    p._container;

    p._initialize = function PatternSelectorAnchor__initialize(container,type){
        this._container = container;
        this._type = type;
        this.rendering = new createjs.Bitmap(Assets.anchor);
        this.bounds = this.rendering.getBounds();
        this.rendering.on("pressmove",this._pressMoveHandler,this);
        this.rendering.on("pressup",this._pressUpHandler,this);
        this.rendering.on("mousedown",this._mouseDownHandler,this);
    }

    p._mouseDownHandler = function PatternSelectorAnchor__mouseDownHandler(event) {

        var bounds = this._container.bounds;
        this._startX = ~~event.stageX;
        this._startY = ~~event.stageY;
        this._startBounds = {
            x:bounds.x,
            y:bounds.y,
            w:bounds.w,
            h:bounds.h
        }
    }

    p._T = function(bounds,diff,limit){
        if(this._startBounds.h-diff < limit){
            diff = this._startBounds.h-limit;
        }
        bounds.y = this._startBounds.y+diff;
        bounds.h = this._startBounds.h-diff;
    }

    p._B = function(bounds,diff,limit){
        var h = this._startBounds.h+diff;
        bounds.h = (h < limit)?limit:h;
    }

    p._L = function(bounds,diff,limit){
        if(this._startBounds.w-diff < limit){
            diff = this._startBounds.w-limit;
        }
        bounds.x = this._startBounds.x+diff;
        bounds.w = this._startBounds.w-diff;
    }

    p._R = function(bounds,diff,limit){
        var w = this._startBounds.w+diff;
        bounds.w = (w < limit)?limit:w;
    }


    p._pressUpHandler = function PatternSelectorAnchor__pressUpHandler(event) {
        this._container._apply();
    }

    p._pressMoveHandler = function PatternSelectorAnchor__pressMoveHandler(event){

        var bounds = this._container.bounds;

        var diffX = ~~event.stageX - this._startX;
        var diffY = ~~event.stageY - this._startY;
        var limitX = Const.PEARL_WIDTH*2;
        var limitY = Const.PEARL_HEIGHT*2;
        //console.log(diffX,diffY);
        switch(this._type){
            case 'TL':
                this._T(bounds,diffY,limitY);
                this._L(bounds,diffX,limitX);
                break;
            case 'TM':
                this._T(bounds,diffY,limitY);
                break;
            case 'TR':
                this._T(bounds,diffY,limitY);
                this._R(bounds,diffX,limitX);
                break;
            case 'CL':
                this._L(bounds,diffX,limitX);
                break;
            case 'CR':
                this._R(bounds,diffX,limitX);
                break;
            case 'BL':
                this._B(bounds,diffY,limitY);
                this._L(bounds,diffX,limitX);
                break;
            case 'BM':
                this._B(bounds,diffY,limitY);
                break;
            case 'BR':
                this._B(bounds,diffY,limitY);
                this._R(bounds,diffX,limitX);
                break;
        }
        this._container._update();
    }

    p.setPosition =  function PatternSelectorAnchor_setPosition(x,y){
        this.rendering.x = x-this.bounds.width*0.5;
        this.rendering.y = y-this.bounds.height*0.5;
    }


    return clazz;
});
