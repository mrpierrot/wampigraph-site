/**
 * The main requirejs configuration (except for baseUrl)
 *
 * This file is included in ::_requirejs.html.twig and in Gruntfile.js. The
 * baseUrl is not here so we can dynamically vary it in ::_requirejs.html.twig
 */

'use strict';

requirejs.config({
    baseUrl: '/assets/js',
    paths: {
        jquery: '../vendor/jquery/dist/jquery',
        bootstrap: '../vendor/components-bootstrap/js/bootstrap.min',
        angular: '../vendor/angular/angular',
        'angular-bootstrap': '../vendor/angular-bootstrap/ui-bootstrap-tpls',
        'angular-route': '../vendor/angular-route/angular-route',
        'components-bootstrap': '../vendor/components-bootstrap/js/bootstrap',
        easeljs: '../vendor/easeljs/lib/easeljs-0.7.1.combined',
        requirejs: '../vendor/requirejs/require',
        'requirejs-domready': '../vendor/requirejs-domready/domReady',
        'requirejs-index': '../vendor/requirejs-index/index'
    },
    shim: {
        easel: {
            exports: 'createjs'
        },
        bootstrap: [
            'jquery'
        ],
        angular: {
            deps: [
                'jquery'
            ],
            exports: 'angular'
        },
        'angular-route': {
            deps: [
                'angular'
            ],
            exports: 'angular'
        },
        'angular-bootstrap': {
            deps: [
                'angular'
            ],
            exports: 'angular'
        }
    },
    packages: [

    ]
});




require(['requirejs-domready'], function (domReady) {
    domReady(function () {
        require(['core/app'], function (app) {
            app.init();
        });
    });
});