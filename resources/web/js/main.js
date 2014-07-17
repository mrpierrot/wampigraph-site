/**
 * Created by Pierrot on 15/07/14.
 */


define(function (require) {
    'use strict';
console.log('pouet');
    var angular = require('angular');
    var route = require('angular-route');
    var controllers = require('./app/controllers');


    var app = angular.module('WampiGraphApp', ['ngRoute','MainControllers']);

    app.init = function () {
       // angular.bootstrap(document, ['WampiGraphApp']);
    };

    app.config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/',{
            templateUrl: 'assets/js/app/views/core.html',
            controller:'CoreCtrl'
        }).otherwise({
            redirectTo: '/'
        });
    }]);

    return app;
});
