/**
 * Created by Pierrot on 29/07/14.
 */
define([
    './PatternSelectorAnchor',
    './Const',
    'easeljs'
],function (PatternSelectorAnchor,Const) {

    var clazz = function PatternSelector(){
        this._initialize();
    };

    var p = clazz.prototype;

    p.rendering = null,
    p.bounds,
    p._maxCol,
    p._maxRow,
    p._anchorTopLeft,
    p._anchorTopMiddle,
    p._anchorTopRight,
    p._anchorCenterLeft,
    p._anchorCenterRight,
    p._anchorBottomLeft,
    p._anchorBottomMiddle,
    p._anchorBottomRight,
    p._shape
    ;

    p._initialize = function PatternSelector__initialize(){

        this.rendering = new createjs.Container();


        this._anchorTopLeft = new PatternSelectorAnchor(this,'TL');
        this._anchorTopMiddle = new PatternSelectorAnchor(this,'TM');
        this._anchorTopRight = new PatternSelectorAnchor(this,'TR');
        this._anchorCenterLeft = new PatternSelectorAnchor(this,'CL');
        this._anchorCenterRight = new PatternSelectorAnchor(this,'CR');
        this._anchorBottomLeft = new PatternSelectorAnchor(this,'BL');
        this._anchorBottomMiddle = new PatternSelectorAnchor(this,'BM');
        this._anchorBottomRight  = new PatternSelectorAnchor(this,'BR');

        this._shape = new createjs.Shape();
        this.rendering.addChild(this._shape);

        this.rendering.addChild(this._anchorTopLeft.rendering);
        this.rendering.addChild(this._anchorTopMiddle.rendering);
        this.rendering.addChild(this._anchorTopRight.rendering);
        this.rendering.addChild(this._anchorCenterLeft.rendering);
        this.rendering.addChild(this._anchorCenterRight.rendering);
        this.rendering.addChild(this._anchorBottomLeft.rendering);
        this.rendering.addChild(this._anchorBottomMiddle.rendering);
        this.rendering.addChild(this._anchorBottomRight.rendering);

        this.bounds = {x:0,y:0,w:1,h:1};

        this.rendering.visible = false;
    }

    p._update = function PatternSelectorAnchor__update(){

        var rect = this.bounds;

        var top = rect.y,
            center = rect.y+rect.h*0.5,
            bottom = rect.y+rect.h,
            left = rect.x,
            middle = rect.x+rect.w*0.5,
            right = rect.x+rect.w;
        this._anchorTopLeft.setPosition(left,top);
        this._anchorTopMiddle.setPosition(middle,top);
        this._anchorTopRight.setPosition(right,top);
        this._anchorCenterLeft.setPosition(left,center);
        this._anchorCenterRight.setPosition(right,center);
        this._anchorBottomLeft.setPosition(left,bottom);
        this._anchorBottomMiddle.setPosition(middle,bottom);
        this._anchorBottomRight.setPosition(right,bottom);


        this._shape.graphics.c()
            .s('#FFFFFF')
            .ss(3)
            .dr(left+0.5,top+0.5,rect.w,rect.h);

    }

    p._apply = function PatternSelectorAnchor__apply(){

        this.bounds.x = ~~(0.5+this.bounds.x /Const.PEARL_WIDTH)*Const.PEARL_WIDTH;
        this.bounds.y = ~~(0.5+this.bounds.y /Const.PEARL_HEIGHT)*Const.PEARL_HEIGHT;
        this.bounds.w = ~~(0.5+this.bounds.w /Const.PEARL_WIDTH)*Const.PEARL_WIDTH;
        this.bounds.h = ~~(0.5+this.bounds.h /Const.PEARL_HEIGHT)*Const.PEARL_HEIGHT;
        this._update();
    }

    p.activate = function PatternSelectorAnchor_activate(col,row,width,height,maxRow,maxCol){
        this._maxRow = maxRow;
        this._maxCol = maxCol;
        this.bounds.x = col*Const.PEARL_WIDTH;
        this.bounds.y = row*Const.PEARL_HEIGHT;
        this.bounds.w = width*Const.PEARL_WIDTH;
        this.bounds.h = height*Const.PEARL_HEIGHT;
        this._update();
        this.rendering.visible = true;
    }

    p.desactivate = function PatternSelectorAnchor_desactivate(){
        this.rendering.visible = false;
    }


    p.getBounds = function PatternSelectorAnchor_getBounds(){
        return {
            x:~~(this.bounds.x/Const.PEARL_WIDTH),
            y:~~(this.bounds.y/Const.PEARL_HEIGHT),
            w:~~(this.bounds.w/Const.PEARL_WIDTH),
            h:~~(this.bounds.h/Const.PEARL_HEIGHT)
        }
    }

    return clazz;
});