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
    'angular-bootstrap',
    'angular-ui-slider'
],function (angular,ngRoute,controllers,directives,services) {

    var app = angular.module('PainterApp', ['ngRoute','ui.bootstrap','ui.slider']);

    app.init = function () {
       angular.bootstrap(document, ['PainterApp']);
    };

    app.controller(controllers);
    app.directive(directives);
    app.factory(services);

    app.config(['$routeProvider',function($routeProvider){
        $routeProvider
        .when('/',{
            templateUrl: '/assets/js/painter/core/views/painter.html',
            reloadOnSearch: false
        }).when('/:id',{
            templateUrl: '/assets/js/painter/core/views/painter.html',
            reloadOnSearch: false
        }).otherwise({
            redirectTo: '/'
        });
    }]);





    return app;
});
