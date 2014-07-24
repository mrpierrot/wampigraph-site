/**
* Created by Pierrot on 21/07/14.
*/

'use strict';

define([
    './Pearl',
    'easeljs'
    ],function (Pearl) {
    var clazz = function Engine(stage,cols,rows){
        this._initialize(stage,cols,rows);
    };

    var p = clazz.prototype = new createjs.EventDispatcher();

    p.PEARL_WIDTH = 20;
    p.PEARL_HEIGHT = 50;

    p.TOOL_BRUSH = 'brush';

    p.rendering = null,
    p._cols,
    p._rows,
    p._lastCol,
    p._lastRow,
    p._lastX,
    p._lastY,
    p._canvasWidth,
    p._canvasHeight,
    p._history,
    p._historyIndex;
    p._pearls,
    p._pearlsContainer = null,
    p._grid = null,
    p._stage = null,
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
        if(this._tool !== this.TOOL_BRUSH)return;
        this._lastX = this._stage.mouseX;
    }

    p._mouseUpHandler = function Engine__mouseUpHandler(){
        if(this._tool !== this.TOOL_BRUSH)return;
        this._saveState();
    }

    p._pressMoveHandler = function Engine__pressMoveHandler(){
        if(this._tool !== this.TOOL_BRUSH)return;

        // On recupere la position de la souris
        var mouseX = this._stage.mouseX,
            mouseY = this._stage.mouseY;

        // On calcul la position de la souris en colonnes/lignes du cavena de perles
        var col = ~~(mouseX/this.PEARL_WIDTH);
        var row = ~~(mouseY/this.PEARL_HEIGHT);

        // si la la souris s'est deplacé sur une autre perle que la derniere déjà survolé
        if(this._lastCol!==col
            ||this._lastRow!==row
            ){

            // On trace une ligne droite entre la position de la souris actuel et la derniere position connu
            // Pour celà, on utilise l'algorithme de Bresenham ( http://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm )
            var x0 = this._lastCol,
                y0 = this._lastRow,
                x1 = col,
                y1 = row;

            if(x0 != null && y0!=null){
                var dx = Math.abs(x1-x0),
                    dy = Math.abs(y1-y0),
                    sx = (x0 < x1) ? 1 : -1,
                    sy = (y0 < y1) ? 1 : -1,
                    err = dx-dy;

                do{
                    // on tourne la perle courante

                    this._togglePearl(x0,y0,(mouseX-this._lastX > 0)?'right':'left');

                    var e2 = 2*err;
                    if (e2 >-dy){ err -= dy; x0  += sx; }
                    if (e2 < dx){ err += dx; y0  += sy; }


                }while(!((x0==x1) && (y0==y1)));
            }



        }

        // stockage de la position de la souris en la definissant comme derniere valeur
        this._lastCol = col;
        this._lastRow = row;
        this._lastX = mouseX;
        this._lastY = mouseY;

    }



    p._pressUpHandler = function Engine__pressUpHandler(){
        if(this._tool !== this.TOOL_BRUSH)return;
        this._lastCol = null;
        this._lastRow = null;
        this._saveState();
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

       /* var g = this._grid.graphics.c().ss(1).s("#DCDCDC");


        for(var x=0;x<this._cols;x++){
            g.mt(x*this.PEARL_WIDTH+0.5,0);
            g.lt(x*this.PEARL_WIDTH+0.5,this._canvasHeight);
        }

        for(var y=0;y<this._rows;y++){
            g.mt(0,y*this.PEARL_HEIGHT+0.5);
            g.lt(this._canvasWidth,y*this.PEARL_HEIGHT+0.5);
        }


        g.es();*/
    }

    p._setSize = function Engine__setSize(cols,rows){
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


    p._saveState = function Engine__saveState(){
        if(this._historyIndex >= 0){
            this._historyIndex++;
            this._history.splice(this._historyIndex,this._history.length,this.getData());
            console.log('Engine__saveState',this._historyIndex,this._history.length);
        }
        this.dispatchEvent("historyChanged");
    }

    p.undo = function Engine_undo(){
        console.log('Engine_undo',this._historyIndex,this._history.length);
        if(this._historyIndex > 0 && this._history.length > 1){
            this._historyIndex--;
            this.load(this._history[this._historyIndex]);
            this.dispatchEvent("historyChanged");
        }
    }

    p.redo = function Engine_redo(){
        console.log('Engine_redo',this._historyIndex,this._history.length);
        if(this._historyIndex < this._history.length-1){
            this._historyIndex++;
            this.load(this._history[this._historyIndex]);
            this.dispatchEvent("historyChanged");
        }
    }

    p.canUndo = function Engine_canUndo(){
        return this._historyIndex > 0;
    }

    p.canRedo = function Engine_canRedo(){
        return this._historyIndex < this._history.length-1;
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
        this._history = [this.getData()];
        this._historyIndex = 0;

        this._updateDisplay();
    }

    p.load = function Engine_load(data){
        this._setSize(data.cols,data.rows);
        for(var i= 0,c=this._pearls.length;i<c;i++){
            this._pearls[i].toggled(data.raw[i]==="1");

        }
    }



    p.setSize = function Engine_setSize(cols,rows){
        this._setSize(cols,rows);
        this._saveState();

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
           raw += this._pearls[i].isToggle?"1":"0";
        }

        return {
            cols:this._cols,
            rows:this._rows,
            raw: raw
        };

    }


    return clazz;
});