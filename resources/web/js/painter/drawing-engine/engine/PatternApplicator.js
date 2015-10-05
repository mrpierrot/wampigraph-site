/**
 * Created by Pierrot on 11/08/14.
 */


define(['../Assets','./Const'],function (Assets,Const) {

    var clazz = function PatternApplicator(){
        this._initialize();
    };

    var p = clazz.prototype;

    p.rendering = null;
    p._shape = null;
    p.data = null;
    p.col;
    p.row;

    p._initialize = function Pearl__initialize(){

        this.rendering = new createjs.Container();

        this._shape = new createjs.Shape();
        this._shape.alpha = 0.5;
        this.rendering.addChild(this._shape);
        //this.rendering.cache();
    }

    p.setData = function Pattern_setData(data){
        console.log('data',data);
        this.data = data;
        var g = this._shape.graphics;
        g.c();
        var raw = data.raw;
        var cols = data.cols;
        var rows = data.rows;
        var faceA = Assets.pearlFaceA;
        var faceB = Assets.pearlFaceB;
        for( var i= 0,c=raw.length;i<c;i++){

           var x = (i%cols)*Const.PEARL_WIDTH,
               y = (~~(i/cols))*Const.PEARL_HEIGHT,
               isToggled = raw[i]=="1";
           /*g.beginBitmapFill(isToggled?faceB:faceA,'no-repeat').
                dr(x,y,Const.PEARL_WIDTH,Const.PEARL_HEIGHT)
                .ef();*/
            g.f(isToggled?"#777777":"#FFFFFF").
                dr(x,y,Const.PEARL_WIDTH,Const.PEARL_HEIGHT)
                .ef();
        }
        this._shape.cache(0,0,cols*Const.PEARL_WIDTH,rows*Const.PEARL_HEIGHT);
    }

    p.setPosition = function Pattern_setPosition(col,row){
        this.col = col;
        this.row = row;
        this.rendering.x = col*Const.PEARL_WIDTH;
        this.rendering.y = row*Const.PEARL_HEIGHT;
    }

    p.activate = function PatternApplicator_activate(){

        this.rendering.visible = true;
    }

    p.desactivate = function PatternApplicator_desactivate(){
        this.rendering.visible = false;
    }

    return clazz;
});