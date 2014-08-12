/**
 * Created by Pierrot on 15/07/14.
 */
'use strict';

define([
    'angular',
    'angular-route',
    './controllers/index',
    './directives/index',
    './services/index',
    'angular-xeditable',
    'angular-bootstrap'
],function (angular,ngRoute,controllers,directives,services) {

    var app = angular.module('AdminApp', ['ngRoute','ui.bootstrap','xeditable']);

    app.init = function () {
       angular.bootstrap(document, ['AdminApp']);
    };

    app.controller(controllers);
    app.directive(directives);
    app.factory(services);

    app.config(['$routeProvider',function($routeProvider){
        $routeProvider
        .when('/',{
            templateUrl: '/assets/js/admin/views/my-wampums.html',
        }).otherwise({
            redirectTo: '/'
        });
    }]);





    return app;
});
