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


    var app = angular.module('WampiGraphApp', ['ngRoute','ui.bootstrap','ui.slider']);

    app.init = function () {
       angular.bootstrap(document, ['WampiGraphApp']);
    };

    app.controller(controllers);
    app.directive(directives);
    app.factory(services);

    app.config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/',{
            templateUrl: '/assets/js/core/views/core.html'
        }).otherwise({
            redirectTo: '/'
        });
    }]);





    return app;
});
