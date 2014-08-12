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
        this.rendering = new createjs.Sprite(Assets.pearl)
    }

    p.setPosition = function(x,y){
        this.rendering.x = x;
        this.rendering.y = y;

    }

    p.toggle = function Pearl_toggle(direction){
        this.toggled(!this.isToggle,direction);

    }

    p.toggled = function Pearl_toggled(toggled,direction){

        if(toggled != this.isToggle){
            direction = direction || 'left';

            this.isToggle = toggled;
            var label = (this.isToggle?'a2b':'b2a')+'-'+direction;
            this.rendering.gotoAndPlay(label);

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