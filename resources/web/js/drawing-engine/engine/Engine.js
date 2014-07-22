/**
* Created by Pierrot on 21/07/14.
*/
define([
    './Pearl'
    ],function (Pearl) {
    var clazz = function Engine(stage){
        this._initialize(stage);
    };

    var p = clazz.prototype;

    p.PEARL_WIDTH = 20;
    p.PEARL_HEIGHT = 50;

    p.rendering = null,
    p._cols,
    p._rows,
    p._lastCol,
    p._lastRow,
    p._canvasWidth,
    p._canvasHeight,
    p._pearls,
    p._pearlsContainer = null,
    p._grid = null,
    p._stage = null;



    p._initialize = function Engine__initialize(stage){
        this._stage = clazz.stage = stage;
        this.rendering = new createjs.Container();

        this._pearlsContainer = new createjs.Container();
        this.rendering.addChild(this._pearlsContainer);

        this._grid = new createjs.Shape();
        this.rendering.addChild(this._grid);

        var test = new createjs.Text("lol","10px Arial","#000000");

        this.rendering.addChild(test);

        this.setSize(10,10);
        this.reset();

        this.rendering.on('pressmove',this._pressMoveHandler,this);
        this.rendering.on('pressup',this._pressUpHandler,this);

    }

    p._pressMoveHandler = function Engine__pressMoveHandler(){
        var mouseX = this._stage.mouseX,
            mouseY = this._stage.mouseY;

        var col = ~~(mouseX/this.PEARL_WIDTH);
        var row = ~~(mouseY/this.PEARL_HEIGHT);

        if(this._lastCol!==col
            ||this._lastRow!==row
            ){
            if (col < 0) return;
            if (col >= this._cols) return;
            if (row < 0) return;
            if (row >= this._rows) return;

            var index = col+row*this._cols;

            var pearl = this._pearls[index];
            if(pearl){
                pearl.toggle();
            }
            this._lastCol = col;
            this._lastRow = row;
        }

    }

    p._pressUpHandler = function Engine__pressUpHandler(){
        this._lastCol = null;
        this._lastRow = null;
    }

    p._updatePearlsCanvas = function Engine__updatePearlsCanvas(){

    }

    p.reset = function Engine_reset(){
        this._pearlsContainer.removeAllChildren();
        this._pearls = [];


        for(var y=0;y<this._cols;y++){
            for(var x=0;x<this._rows;x++){
                var pearl = new Pearl(this.PEARL_WIDTH,this.PEARL_HEIGHT);
                pearl.rendering.x = x*this.PEARL_WIDTH;
                pearl.rendering.y = y*this.PEARL_HEIGHT;
                this._pearlsContainer.addChild(pearl.rendering);
                this._pearls.push(pearl);

            }
        }

        var g = this._grid.graphics.c().ss(1).s("#DCDCDC");

        for(var x=0;x<this._rows;x++){
            g.mt(x*this.PEARL_WIDTH+0.5,0);
            g.lt(x*this.PEARL_WIDTH+0.5,this._canvasHeight);
        }

        for(var y=0;y<this._cols;y++){
            g.mt(0,y*this.PEARL_HEIGHT+0.5);
            g.lt(this._canvasWidth,y*this.PEARL_HEIGHT+0.5);
        }
        g.es();
    }

    p.setSize = function Engine_setSize(rows,cols){
        this._rows = rows;
        this._cols = cols;
        this._canvasWidth = this._cols*this.PEARL_WIDTH;
        this._canvasHeight = this._rows*this.PEARL_HEIGHT;

    }



    p.setTool = function Engine_setTool(name){
        console.log('Tool selected : '+name);
    }


    return clazz;
});