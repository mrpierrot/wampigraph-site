/**
* Created by Pierrot on 21/07/14.
*/

'use strict';

define([
    './Pearl',
    './PatternSelector',
    './PatternApplicator',
    './Const',
    'easeljs'
    ],function (Pearl,PatternSelector,PatternApplicator,Const) {
    var clazz = function Engine(stage,width,height,cols,rows){
        this._initialize(stage,width,height,cols,rows);
    };

    var p = clazz.prototype = new createjs.EventDispatcher();

    p.rendering = null,
    p._cols,
    p._width,
    p._height,
    p._viewport,
    p._xRate,
    p._yRate,
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
    p._stage = null,
    p._patternSelector,
    p._patternApplicator,
    p._tool = null;



    p._initialize = function Engine__initialize(stage,width,height,cols,rows){
        this._stage = clazz.stage = stage;

        this._width = width;
        this._height = height;
        this._cols = cols || 80;
        this._rows = rows || 18;

        this._viewport = {x:0,y:0,width:this._width,height:this._height};
        this._xRate = 0;
        this._yRate = 0;
        //this._visiblePearls = [];

        this.rendering = new createjs.Container();

        this._pearlsContainer = new createjs.Container();
        this.rendering.addChild(this._pearlsContainer);




        this._canvasWidth = this._cols*Const.PEARL_WIDTH;
        this._canvasHeight = this._rows*Const.PEARL_HEIGHT;

        this._patternSelector = new PatternSelector();
        this.rendering.addChild(this._patternSelector.rendering);

        this._patternApplicator = new PatternApplicator();
        this.rendering.addChild(this._patternApplicator.rendering);

        this.reset();

        this.rendering.on('pressmove',this._pressMoveHandler,this);
        this.rendering.on('pressup',this._pressUpHandler,this);
        this.rendering.on('click',this._clickHandler,this);
        this.rendering.on('mousedown',this._mouseDownHandler,this);


    }

    p.handleEvent = function Engine_handleTick(event){
        if(event.type == "tick"){
            if(this._tool !== Const.TOOL_PATTERN_APPLICATOR || !this._patternApplicator.data)return;
            var mouseX = this._stage.mouseX-this._viewport.x,
                mouseY = this._stage.mouseY-this._viewport.y;
            var col = ~~(mouseX/Const.PEARL_WIDTH)-~~(this._patternApplicator.data.cols*0.5);
            var row = ~~(mouseY/Const.PEARL_HEIGHT)-~~(this._patternApplicator.data.rows*0.5);
            this._patternApplicator.setPosition(col,row);
        }

    }

    p._mouseDownHandler = function Engine__mouseDownHandler(){
        if(this._tool !== Const.TOOL_BRUSH)return;
        this._lastX = this._stage.mouseX;
    }

    p._mouseUpHandler = function Engine__mouseUpHandler(){
        if(this._tool !== Const.TOOL_BRUSH)return;
        this._saveState();
    }

    p._pressMoveHandler = function Engine__pressMoveHandler(){
        if(this._tool !== Const.TOOL_BRUSH)return;

        // On recupere la position de la souris
        var mouseX = this._stage.mouseX-this._viewport.x,
            mouseY = this._stage.mouseY-this._viewport.y;

        // On calcul la position de la souris en colonnes/lignes du cavena de perles
        var col = ~~(mouseX/Const.PEARL_WIDTH);
        var row = ~~(mouseY/Const.PEARL_HEIGHT);

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
        if(this._tool !== Const.TOOL_BRUSH)return;
        this._lastCol = null;
        this._lastRow = null;
        this._saveState();
    }

    p._toolInitPatternApply = function Engine__toolInitPatternApply(){
        this._patternApplicator.activate();
    }

    p._toolInitPatternCreator = function Engine__toolInitPatternCreator(){

        var defaultCols = Const.PATTERN_CREATOR_CONFIG.cols;
        var defaultRows = Const.PATTERN_CREATOR_CONFIG.rows;
        var cols = this._cols < defaultCols?this._cols:defaultCols;
        var rows = this._rows < defaultRows?this._cols:defaultRows;

        var c = this._cols,
            cc = 0,
            r = this._rows,
            rr = 0;
        if( this._viewport.width < this._canvasWidth){
            c = ~~(this._viewport.width/Const.PEARL_WIDTH);
            cc = ~~(this._viewport.x/Const.PEARL_WIDTH);
        }
        if(this._viewport.height < this._canvasHeight){
            r = ~~(this._viewport.height/Const.PEARL_HEIGHT);
            rr = ~~(this._viewport.y/Const.PEARL_HEIGHT);
        }
        this._patternSelector.activate(
            ~~((c-cols)*0.5)-cc,
            ~~((r-rows)*0.5)-rr,
            cols,rows,this._cols,this._rows);

    }
    p._toolDisablePatternCreator = function Engine__toolDisablePatternCreator(){
        this._patternSelector.desactivate();
    }

    p._toolDisablePatternApply = function Engine__toolDisablePatternApply(){
        this._patternApplicator.desactivate();
    }

    p._clickHandler = function Engine__clickHandler(){
        this._clickTogglePearl();
        this._clickApplyPattern();

    }

    p._clickTogglePearl = function Engine__clickTogglePearl(){
        if(this._tool !== Const.TOOL_BRUSH)return;
        if(this._lastCol != null ||this._lastRow != null)return;


        var mouseX = this._stage.mouseX-this._viewport.x,
            mouseY = this._stage.mouseY-this._viewport.y;

        var col = ~~(mouseX/Const.PEARL_WIDTH);
        var row = ~~(mouseY/Const.PEARL_HEIGHT);

        this._togglePearl(col,row);
    }

    p._clickApplyPattern = function Engine__clickApplyPattern(){
        if(this._tool !== Const.TOOL_PATTERN_APPLICATOR || !this._patternApplicator.data)return;

        var data = this._patternApplicator.data,
            raw = data.raw,
            cols = data.cols,
            rows = data.rows;

        for( var i= 0,c=raw.length;i<c;i++){
            var col = (i%cols)+this._patternApplicator.col,
                row = (~~(i/cols))+this._patternApplicator.row,
                isToggled = raw[i]=="1";
            this._setPearlToggled(isToggled,col,row);
        }
        this._saveState();
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

    p._setPearlToggled = function Engine__setPearlToggled(toggled,col,row,direction){
        if (col < 0) return;
        if (col >= this._cols) return;
        if (row < 0) return;
        if (row >= this._rows) return;

        var index = col+row*this._cols;

        var pearl = this._pearls[index];
        if(pearl){
            pearl.toggled(toggled,direction);
        }
    }

    p._updateDisplay = function Engine__updateDisplay(){
        this._pearlsContainer.removeAllChildren();

        for(var i= 0,c=this._pearls.length;i<c;i++){
            this._pearlsContainer.addChild(this._pearls[i].rendering);

        }
        this.updateViewport();
    }

    p.updateViewport = function Engine_updateViewport(width,height){
        if(width)this._viewport.width = +width;
        if(height)this._viewport.height = +height;

        var diffX = this._viewport.width - this._canvasWidth;
        var diffY = this._viewport.height - this._canvasHeight;

        this.rendering.x = this._viewport.x = (diffX < 0)?this._xRate*diffX:diffX*0.5;
        this.rendering.y = this._viewport.y = (diffY < 0)?this._yRate*diffY:diffY*0.5;

        for(var i= 0,c=this._pearls.length;i<c;i++){
            var pearl = this._pearls[i].rendering;
            if( pearl.x + Const.PEARL_WIDTH < -this._viewport.x ){ pearl.visible = false; continue; }
            else if( pearl.x > -this._viewport.x + this._viewport.width ){ pearl.visible = false; continue; }
            else if( pearl.y + Const.PEARL_HEIGHT < -this._viewport.y ){ pearl.visible = false; continue; }
            else if( pearl.y > -this._viewport.y + this._viewport.height ){ pearl.visible = false; continue; }
            else { pearl.visible = true;}


        }

    }

    p._setSize = function Engine__setSize(cols,rows){
        console.log(cols,rows);
        var oldRows = this._rows,
            oldCols = this._cols;

        this._rows = rows;
        this._cols = cols;
        this._canvasWidth = this._cols*Const.PEARL_WIDTH;
        this._canvasHeight = this._rows*Const.PEARL_HEIGHT;


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
                    var pearl = new Pearl(Const.PEARL_WIDTH,Const.PEARL_HEIGHT);
                    var index = start +i;
                    pearl.setPosition((index%this._cols)*Const.PEARL_WIDTH,(~~(index/this._cols))*Const.PEARL_HEIGHT);
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
                var pearl = new Pearl(Const.PEARL_WIDTH,Const.PEARL_HEIGHT);
                var index = start +i;
                pearl.setPosition((index%this._cols)*Const.PEARL_WIDTH,(~~(index/this._cols))*Const.PEARL_HEIGHT);
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
            this._loadState(this._historyIndex);
            this.dispatchEvent("historyChanged");
        }
    }

    p.redo = function Engine_redo(){
        console.log('Engine_redo',this._historyIndex,this._history.length);
        if(this._historyIndex < this._history.length-1){
            this._historyIndex++;
            this._loadState(this._historyIndex);
            this.dispatchEvent("historyChanged");
        }
    }

    p.canUndo = function Engine_canUndo(){
        return this._historyIndex > 0;
    }

    p.canRedo = function Engine_canRedo(){
        return this._historyIndex < this._history.length-1;
    }

    p.clearHistory = function(){

    }

    p.fill = function Engine_fill(toggled){
        var dir = Math.random()>0.5?"left":"right";
        for(var i= 0,c=this._pearls.length;i<c;i++){
            this._pearls[i].toggled(toggled,dir);

        }
        this._saveState();
    }

    p.reset = function Engine_reset(){

        this._pearls = [];




        for(var y=0;y<this._rows;y++){
            for(var x=0;x<this._cols;x++){
                var pearl = new Pearl(Const.PEARL_WIDTH,Const.PEARL_HEIGHT);
                pearl.setPosition(x*Const.PEARL_WIDTH,y*Const.PEARL_HEIGHT);
                this._pearls.push(pearl);
            }
        }
        this._history = [this.getData()];
        this._historyIndex = 0;

        this._updateDisplay();
    }

    p._loadState = function Engine_load(index){
        var data = this._history[index];
        this._setSize(data.cols,data.rows);
        for(var i= 0,c=this._pearls.length;i<c;i++){
            this._pearls[i].toggled(data.raw[i]==="1");
        }
        this.updateViewport();
    }

    p.load = function Engine_load(data){
        console.log("pearls : ",this._pearls.length);
        this._cols = data.cols;
        this._rows = data.rows;
        this._canvasWidth = this._cols*Const.PEARL_WIDTH;
        this._canvasHeight = this._rows*Const.PEARL_HEIGHT;
        this.reset();
        console.log("pearls : ",this._pearls.length);
        for(var i= 0,c=this._pearls.length;i<c;i++){
            this._pearls[i].toggled(data.raw[i]==="1");

        }
        this._history = [this.getData()];
        this.updateViewport();
    }



    p.setSize = function Engine_setSize(cols,rows,vAlign,hAlign){
        console.log(cols,rows,vAlign,hAlign);
        this._setSize(cols,rows);
        this._saveState();

    }



    p.setTool = function Engine_setTool(name){
        console.log('Old tool : '+this._tool);
        console.log('Tool selected : '+name);
        switch (this._tool){
            case Const.TOOL_PATTERN_CREATOR:
                this._toolDisablePatternCreator();
            case Const.TOOL_PATTERN_APPLICATOR:
                this._toolDisablePatternApply();
        }

        switch (name){
            case Const.TOOL_BRUSH:
                this._tool = name;
                break;
            case Const.TOOL_PATTERN_CREATOR:
                this._tool = name;
                this._toolInitPatternCreator();
                break;
            case Const.TOOL_PATTERN_APPLICATOR:
                this._tool = name;
                this._toolInitPatternApply();
                break;
            default :
                this._tool = null;
        }
    }

    p.clearTools = function Engine_clearTools(){
        this._toolDisablePatternCreator();
        this._tool = null;
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

    p.moveViewport = function Engine__moveViewport(x,y){
        if(x<0)x=0;
        if(x>1)x=1;
        if(y<0)y=0;
        if(y>1)y=1;
        this._xRate = x;
        this._yRate = y;
        this.updateViewport();
    }

    p.getPattern = function Engine_getPattern(){
        if(this._tool !== Const.TOOL_PATTERN_CREATOR)return null;
        var bounds = this._patternSelector.getBounds();
        console.log(bounds);
        var raw = "";
        for(var y =bounds.y;y<bounds.y+bounds.h;y++){
            for( var x = bounds.x;x<bounds.x+bounds.w;x++){
                raw += this._pearls[x+y*this._cols].isToggle?"1":"0";
            }
        }
        return {
            cols:bounds.w,
            rows:bounds.h,
            raw:raw
        }
    }

    p.setPattern = function Engine_setPattern(data){
        console.log(data);
        this._patternApplicator.setData(data);

        var defaultCols = data.cols;
        var defaultRows = data.rows;
        var cols = this._cols < defaultCols?this._cols:defaultCols;
        var rows = this._rows < defaultRows?this._cols:defaultRows;

        var c = this._cols,
            cc = 0,
            r = this._rows,
            rr = 0;
        if( this._viewport.width < this._canvasWidth){
            c = ~~(this._viewport.width/Const.PEARL_WIDTH);
            cc = ~~(this._viewport.x/Const.PEARL_WIDTH);
        }
        if(this._viewport.height < this._canvasHeight){
            r = ~~(this._viewport.height/Const.PEARL_HEIGHT);
            rr = ~~(this._viewport.y/Const.PEARL_HEIGHT);
        }
        this._patternApplicator.setPosition(~~((c-cols)*0.5)-cc,~~((r-rows)*0.5)-rr);
    }

    p.getDimensions = function Engine_getDimensions(){
        return {cols:this._cols,rows:this._rows,xRate:this._xRate,yRate:this._yRate};
    }


    return clazz;
});