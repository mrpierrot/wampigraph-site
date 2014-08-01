/**
 * Created by Pierrot on 01/08/14.
 */
define(function () {
    return function($rootScope){
        return {
            $emit :function() { $rootScope.$emit.apply($rootScope, arguments); },
            $on :function() { $rootScope.$on.apply($rootScope, arguments); }
        };
    };
});