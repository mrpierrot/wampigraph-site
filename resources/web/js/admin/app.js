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
    'ngInfiniteScroll',
    'angular-roles',
    'casusludi-alerts',
    'checklist-model'
],function (angular,ngRoute,controllers,directives,services) {

    var app = angular.module('AdminApp', [
        'ngRoute',
        'ui.bootstrap',
        'xeditable',
        'checklist-model',
        'angular-roles',
        'casusludi-alerts',
        'infinite-scroll'
    ]),rolesConfig;

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
            .when('/mes-wampums',{templateUrl: '/assets/js/admin/views/my-wampums.html'})
            .when('/mes-motifs',{templateUrl: '/assets/js/admin/views/my-patterns.html'})
            .when('/wampums/validation',{templateUrl: '/assets/js/admin/views/validate-wampums.html'})
            .when('/patterns/validation',{templateUrl: '/assets/js/admin/views/validate-patterns.html'})
            .when('/infos/:id',{templateUrl: '/assets/js/admin/views/single-drawing.html'})
            .when('/corbeille',{templateUrl: '/assets/js/admin/views/garbage.html'})
            .when('/utilisateurs',{templateUrl: '/assets/js/admin/views/users-list.html'})
            .when('/utilisateur/:userId',{templateUrl: '/assets/js/admin/views/user.html'})
            .when('/utilisateur/:userId/wampums',{templateUrl: '/assets/js/admin/views/wampums-by-user.html'})
            .when('/utilisateur/:userId/motifs',{templateUrl: '/assets/js/admin/views/patterns-by-user.html'})
            .otherwise({redirectTo: '/mes-wampums'});
    }]);

    app.run(function(editableOptions,roles) {
        editableOptions.theme = 'bs3';
        roles.setUserRoles(rolesConfig.user_roles);
        roles.setUserId(rolesConfig.user_id);
        roles.setRoleHierarchy(rolesConfig.role_hierarchy);
    });



    return app;
});
