/**
 * Created by Pierrot on 15/07/14.
 */

define([
    'angular',
    'angular-route',
    './directives/index',
    './controllers/MainControllers'
],function (angular,ngRoute,directives) {
    'use strict';



    var app = angular.module('WampiGraphApp', ['ngRoute','MainControllers']);

    app.init = function () {
       angular.bootstrap(document, ['WampiGraphApp']);
    };

    app.directive(directives);

    app.config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/',{
            templateUrl: 'assets/js/views/core.html',
            controller:'CoreCtrl'
        }).otherwise({
            redirectTo: '/'
        });
    }]);





    return app;
});
