/**
 * Created by Pierrot on 18/07/14.
 */
var files =[
    'drawingEngine'
];


var includes = [];
for(var i= 0,c=files.length;i<c;i++){
    includes[i]='./'+files[i];
}
define(includes,function (drawingEngine) {

    'use strict';
    var  directives = {};

    for(var i= 0,c=files.length;i<c;i++){
        directives[files[i]] = arguments[i];
    }
    return directives;
});
