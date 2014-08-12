
'use strict';

requirejs.config({
    baseUrl: '/assets/js/admin',
    paths: {
        jquery: '../../vendor/jquery/dist/jquery',
        bootstrap: '../../vendor/bootstrap/dist/js/bootstrap',
        angular: '../../vendor/angular/angular',
        'angular-bootstrap': '../../vendor/angular-bootstrap/ui-bootstrap-tpls',
        'angular-route': '../../vendor/angular-route/angular-route',
        'angular-xeditable': '../../vendor/angular-xeditable/dist/js/xeditable.min',
        'components-bootstrap': '../../vendor/components-bootstrap/js/bootstrap',
        requirejs: '../../vendor/requirejs/require',
        'requirejs-domready': '../../vendor/requirejs-domready/domReady',
        'requirejs-index': '../../vendor/requirejs-index/index',
        'angular-ui-slider': '../../vendor/angular-ui-slider/src/slider',
        'jquery-ui': '../vendor/jquery-ui/ui/minified/jquery-ui.min',
        'angular-bootstrap-slider': '../../vendor/angular-bootstrap-slider/slider',
        'seiyria-bootstrap-slider': '../../vendor/seiyria-bootstrap-slider/js/bootstrap-slider',
        modernizr: '../../vendor/modernizr/modernizr'
    },
    shim: {
        PreloadJS: {
            exports: 'createjs'
        },
        bootstrap: [
            'jquery'
        ],
        'jquery-ui': [
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
        'angular-xeditable': {
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
        require(['app'], function (app) {
            app.init();
        });
    });
});