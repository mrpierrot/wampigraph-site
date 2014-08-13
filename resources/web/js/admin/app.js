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
    'angular-bootstrap',
    'angular-roles'
],function (angular,ngRoute,controllers,directives,services) {

    var app = angular.module('AdminApp', ['ngRoute','ui.bootstrap','xeditable','angular-roles']),rolesConfig;

    app.init = function () {
        $.get('/api/auth/config',function(data){
            rolesConfig = data;
            angular.bootstrap(document, ['AdminApp']);
        });

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

    app.run(function(editableOptions,roles) {
        editableOptions.theme = 'bs3';
        roles.setUserRoles(rolesConfig.user_roles);
        roles.setRoleHierarchy(rolesConfig.role_hierarchy);
    });



    return app;
});
