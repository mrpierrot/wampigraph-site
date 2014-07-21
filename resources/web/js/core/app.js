/**
 * Created by Pierrot on 15/07/14.
 */

define([
    'angular',
    'angular-route',
    './controllers/index',
    './directives/index'
],function (angular,ngRoute,controllers,directives) {
    'use strict';

    var app = angular.module('WampiGraphApp', ['ngRoute']);

    app.init = function () {
       angular.bootstrap(document, ['WampiGraphApp']);
    };

    app.controller(controllers);
    app.directive(directives);

    app.config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/',{
            templateUrl: 'assets/js/core/views/core.html',
            controller:'CoreController'
        }).otherwise({
            redirectTo: '/'
        });
    }]);





    return app;
});
