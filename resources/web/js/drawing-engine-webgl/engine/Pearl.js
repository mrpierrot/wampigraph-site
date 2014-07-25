/**
 * Created by Pierrot on 21/07/14.
 */

'use strict';

define(['../Assets'],function (Assets) {
    var clazz = function Pearl(width,height){
        this._initialize(width,height);
    };

    var p = clazz.prototype;

    p.rendering = null;
    p._shape = null;
    p._mask = null;
    p.isToggle = false,
    p._indexLabel;

    p._initialize = function Pearl__initialize(width,height){
        this._width = width;
        this._height = height;
        this.rendering = new createjs.Container();

        this._mask = new createjs.Shape();
        this._mask.graphics.c().f("#FF00FF").dr(0,0,this._width,this._height).ef();
        this.rendering.mask = this._mask;
        this.rendering.addChild(this._mask);


        this._shape = new createjs.Shape();
        var color = "#fcffea";
        var toggleColor = "#745a81";
        this._shape.graphics.c().f(color).dr(0,0,this._width,this._height).ef()
            .f(toggleColor).dr(this._width,0,this._width,this._height).ef()
            .f(color).dr(this._width*2,0,this._width,this._height).ef()
            .f(toggleColor).dr(this._width*3,0,this._width,this._height).ef();
        this.rendering.addChild(this._shape);
        this._shape.cache(0,0,this._width*3,this._height);
        //

        this.rendering.addChild(new createjs.Bitmap(Assets.pearl));

    }

    p.setPosition = function(x,y){
        this._mask.x = this.rendering.x = x;
        this._mask.y = this.rendering.y = y;

    }

    p.toggle = function Pearl_toggle(direction){
        this.toggled(!this.isToggle,direction);

    }

    p.toggled = function Pearl_toggled(toggled,direction){
        if(toggled != this.isToggle){
            this.isToggle = toggled;
            TweenLite.killTweensOf(this._shape);
            if(direction === 'left'){
                this._shape.x = !this.isToggle?-this._width:0;
                TweenLite.to(this._shape,0.8,{x:'-='+this._width,ease:Back.easeOut});
            }else{
                this._shape.x = !this.isToggle?-this._width:-this._width*2;
                TweenLite.to(this._shape,0.8,{x:'+='+this._width,ease:Back.easeOut});
            }
        }
    }

    p.setDebugIndex = function Pearl_setDebugIndex(index){
        if(!this._indexLabel){
            this._indexLabel = new createjs.Text(index,"10px Arial","#000000");
            this.rendering.addChild(this._indexLabel);
        }
        this._indexLabel.text = index;
    }

    return clazz;
});