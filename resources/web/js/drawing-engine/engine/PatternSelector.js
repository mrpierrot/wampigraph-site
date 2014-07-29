/**
 * Created by Pierrot on 29/07/14.
 */
define([
    './PatternSelectorAnchor',
    './Const',
    'easeljs'
],function (PatternSelectorAnchor,Const) {

    var clazz = function PatternSelector(stage){
        this._initialize(stage);
    };

    var p = clazz.prototype;

    p.rendering = null,
    p._stage,
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
    p._rectangle,
    p._shape
    ;

    p._initialize = function PatternSelector__initialize(stage){
        this._stage = stage;
        this.rendering = new createjs.Container();


        this._anchorTopLeft = new PatternSelectorAnchor(stage);
        this._anchorTopMiddle = new PatternSelectorAnchor(stage);
        this._anchorTopRight = new PatternSelectorAnchor(stage);
        this._anchorCenterLeft = new PatternSelectorAnchor(stage);
        this._anchorCenterRight = new PatternSelectorAnchor(stage);
        this._anchorBottomLeft = new PatternSelectorAnchor(stage);
        this._anchorBottomMiddle = new PatternSelectorAnchor(stage);
        this._anchorBottomRight  = new PatternSelectorAnchor(stage);

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

        this._rectangle = {x:0,y:0,w:1,h:1};

        this.rendering.visible = false;
    }

    p._update = function PatternSelectorAnchor__update(){

        var rect = this._rectangle,
            top = rect.y,
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
            .s(1)
            .ss('#000000')
            .dr(left+0.5,top+0.5,rect.w,rect.h);

    }

    p._apply = function PatternSelectorAnchor__apply(){

    }

    p.activate = function PatternSelectorAnchor_activate(col,row,width,height,maxRow,maxCol){
        console.log(col,row,width,height,maxRow,maxCol);
        this._maxRow = maxRow;
        this._maxCol = maxCol;
        this._rectangle.x = col*Const.PEARL_WIDTH;
        this._rectangle.y = row*Const.PEARL_HEIGHT;
        this._rectangle.w = width*Const.PEARL_WIDTH;
        this._rectangle.h = height*Const.PEARL_HEIGHT;
        this._update();
        this.rendering.visible = true;
    }

    p.desactivate = function PatternSelectorAnchor_desactivate(){
        this.rendering.visible = false;
    }




    return clazz;
});