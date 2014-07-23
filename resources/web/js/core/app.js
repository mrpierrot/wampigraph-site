/**
 * Created by Pierrot on 15/07/14.
 */
'use strict';

define([
    'angular',
    'angular-route',
    './controllers/index',
    './directives/index',
    'angular-bootstrap'
],function (angular,ngRoute,controllers,directives) {


    var app = angular.module('WampiGraphApp', ['ngRoute','ui.bootstrap']);

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
