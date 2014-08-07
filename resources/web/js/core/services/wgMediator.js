/**
 * Created by Pierrot on 01/08/14.
 */
define(function () {
    return function($rootScope){
        var scope = $rootScope.$new(true);
        scope.infos = {
            //id:null,
            original_id:null,
                type:'wampum',
                title: "Nouveau Wampum",
                description: "",
                raw:null
        };
        return scope;
        /*return {
            $emit :function() { $rootScope.$emit.apply($rootScope, arguments); },
            $on :function() { $rootScope.$on.apply($rootScope, arguments); }
        };*/
    };
});