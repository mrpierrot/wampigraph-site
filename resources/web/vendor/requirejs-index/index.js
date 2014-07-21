/**
 * Created by Pierrot on 21/07/14.
 */

window.requirejs_index = function(files,base){

    var includes = [];
    for(var i= 0,c=files.length;i<c;i++){
        includes[i]=(base || './')+files[i];
    }
    var  modules = {};
    define(includes,function () {

        for(var i= 0,c=files.length;i<c;i++){
            modules[files[i]] = arguments[i];
        }

        return modules;
    });
    return modules;
}
