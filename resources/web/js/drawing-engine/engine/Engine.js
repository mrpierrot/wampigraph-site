/**
* Created by Pierrot on 21/07/14.
*/

'use strict';

define([
    './Pearl'
    ],function (Pearl) {
    var clazz = function Engine(stage,cols,rows){
        this._initialize(stage,cols,rows);
    };

    var p = clazz.prototype;

    p.PEARL_WIDTH = 20;
    p.PEARL_HEIGHT = 50;

    p.TOOL_BRUSH = 'brush';

    p.rendering = null,
    p._cols,
    p._rows,
    p._lastCol,
    p._lastRow,
    p._lastX,
    p._canvasWidth,
    p._canvasHeight,
    p._pearls,
    p._pearlsContainer = null,
    p._grid = null,
    p._stage = null;
    p._tool = null;



    p._initialize = function Engine__initialize(stage,cols,rows){
        this._stage = clazz.stage = stage;
        this.rendering = new createjs.Container();

        this._pearlsContainer = new createjs.Container();
        this.rendering.addChild(this._pearlsContainer);

        this._grid = new createjs.Shape();
        this.rendering.addChild(this._grid);

        this._rows = rows || 10;
        this._cols = cols || 40;
        this._canvasWidth = this._cols*this.PEARL_WIDTH;
        this._canvasHeight = this._rows*this.PEARL_HEIGHT;

        this.reset();

        this.rendering.on('pressmove',this._pressMoveHandler,this);
        this.rendering.on('pressup',this._pressUpHandler,this);
        this.rendering.on('click',this._clickHandler,this);
        this.rendering.on('mousedown',this._mouseDownHandler,this);

    }

    p._mouseDownHandler = function Engine__mouseDownHandler(){
        this._lastX = this._stage.mouseX;
    }

    p._pressMoveHandler = function Engine__pressMoveHandler(){
        if(this._tool !== this.TOOL_BRUSH)return;
        var mouseX = this._stage.mouseX,
            mouseY = this._stage.mouseY;

        var col = ~~(mouseX/this.PEARL_WIDTH);
        var row = ~~(mouseY/this.PEARL_HEIGHT);

        if(this._lastCol!==col
            ||this._lastRow!==row
            ){

            this._togglePearl(col,row,(mouseX-this._lastX > 0)?'right':'left');

            this._lastCol = col;
            this._lastRow = row;
        }
        this._lastX = mouseX;

    }

    p._pressUpHandler = function Engine__pressUpHandler(){
        if(this._tool !== this.TOOL_BRUSH)return;
        this._lastCol = null;
        this._lastRow = null;
    }

    p._clickHandler = function Engine__clickHandler(){
        if(this._tool !== this.TOOL_BRUSH)return;
        if(this._lastCol != null ||this._lastRow != null)return;


        var mouseX = this._stage.mouseX,
            mouseY = this._stage.mouseY;

        var col = ~~(mouseX/this.PEARL_WIDTH);
        var row = ~~(mouseY/this.PEARL_HEIGHT);

        this._togglePearl(col,row);

    }

    p._togglePearl = function Engine__togglePearl(col,row,direction){
        if (col < 0) return;
        if (col >= this._cols) return;
        if (row < 0) return;
        if (row >= this._rows) return;

        var index = col+row*this._cols;

        var pearl = this._pearls[index];
        if(pearl){
            pearl.toggle(direction);
        }
    }

    p._updateDisplay = function Engine__updateDisplay(){
        this._pearlsContainer.removeAllChildren();

        for(var i= 0,c=this._pearls.length;i<c;i++){
            this._pearlsContainer.addChild(this._pearls[i].rendering);

        }

        var g = this._grid.graphics.c().ss(1).s("#DCDCDC");


        for(var x=0;x<this._cols;x++){
            g.mt(x*this.PEARL_WIDTH+0.5,0);
            g.lt(x*this.PEARL_WIDTH+0.5,this._canvasHeight);
        }

        for(var y=0;y<this._rows;y++){
            g.mt(0,y*this.PEARL_HEIGHT+0.5);
            g.lt(this._canvasWidth,y*this.PEARL_HEIGHT+0.5);
        }


        g.es();
    }


    p.reset = function Engine_reset(){

        this._pearls = [];


        for(var y=0;y<this._rows;y++){
            for(var x=0;x<this._cols;x++){
                var pearl = new Pearl(this.PEARL_WIDTH,this.PEARL_HEIGHT);
                pearl.setPosition(x*this.PEARL_WIDTH,y*this.PEARL_HEIGHT);
                this._pearls.push(pearl);
            }
        }

        this._updateDisplay();
    }

    p.setSize = function Engine_setSize(rows,cols){
        var oldRows = this._rows,
            oldCols = this._cols;

        this._rows = rows;
        this._cols = cols;
        this._canvasWidth = this._cols*this.PEARL_WIDTH;
        this._canvasHeight = this._rows*this.PEARL_HEIGHT;


        var diffCols = this._cols-oldCols;
        if(diffCols < 0 ){
            var gap = 0;
            for(var y=0;y<this._rows;y++){
                var start = y*oldCols+this._cols+gap;
                this._pearls.splice(start,-diffCols);
                gap += diffCols;
            }
        }else if(diffCols > 0){
            var gap = 0;
            for(var y=0;y<this._rows;y++){
                var start = y*oldCols+oldCols+gap;
                var args = [start,0];
                for( var i= 0;i<diffCols;i++){
                    var pearl = new Pearl(this.PEARL_WIDTH,this.PEARL_HEIGHT);
                    var index = start +i;
                    pearl.setPosition((index%this._cols)*this.PEARL_WIDTH,(~~(index/this._cols))*this.PEARL_HEIGHT);
                    args.push(pearl);
                }
                this._pearls.splice.apply(this._pearls,args);
                gap += diffCols;
            }
        }

        var diffRows = this._rows-oldRows;

        if(diffRows < 0){
            var start = this._rows*this._cols;
            this._pearls.splice(start,this._pearls.length);

        }else if(diffRows > 0){
            var start = oldRows*this._cols;
            for( var i= 0,c=diffRows*this._cols;i<c;i++){
                var pearl = new Pearl(this.PEARL_WIDTH,this.PEARL_HEIGHT);
                var index = start +i;
                pearl.setPosition((index%this._cols)*this.PEARL_WIDTH,(~~(index/this._cols))*this.PEARL_HEIGHT);
                this._pearls.push(pearl);
            }
        }

        this._updateDisplay();

    }



    p.setTool = function Engine_setTool(name){
        console.log('Tool selected : '+name);
        switch (name){
            case this.TOOL_BRUSH:
                this._tool = name;
                break;
            default :
                this._tool = null;
        }
        if(name === 'test'){
            console.log('test');
            this.setSize(12,10);
        }
    }

    p.getData = function Engine_getRawData(){
        var raw = "";

        for(var i= 0,c=this._pearls.length;i<c;i++){
           raw += this._pearls[i].isToggle?"0":"1";
        }

        return {
            cols:this._cols,
            rows:this._rows,
            raw: raw
        };

    }


    return clazz;
});