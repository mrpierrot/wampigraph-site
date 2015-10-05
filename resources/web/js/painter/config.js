/**
 * The main requirejs configuration (except for baseUrl)
 *
 * This file is included in ::_requirejs.html.twig and in Gruntfile.js. The
 * baseUrl is not here so we can dynamically vary it in ::_requirejs.html.twig
 */

'use strict';

requirejs.config({
    baseUrl: '/assets/js/painter',
    paths: {
        jquery: '../../vendor/jquery/dist/jquery',
        bootstrap: '../../vendor/bootstrap/dist/js/bootstrap',
        angular: '../../vendor/angular/angular',
        'angular-bootstrap': '../../vendor/angular-bootstrap/ui-bootstrap-tpls',
        'angular-route': '../../vendor/angular-route/angular-route',
        'components-bootstrap': '../../vendor/components-bootstrap/js/bootstrap',
        easeljs: '../../vendor/easeljs/lib/easeljs-0.7.1.combined',
        requirejs: '../../vendor/requirejs/require',
        'requirejs-domready': '../../vendor/requirejs-domready/domReady',
        'requirejs-index': '../vendor/requirejs-index/index',
        gsap: '../../vendor/gsap/src/uncompressed/TweenMax',
        PreloadJS: '../../vendor/PreloadJS/lib/preloadjs-0.4.1.combined',
        'angular-ui-slider': '../../vendor/angular-ui-slider/src/slider',
        'jquery-ui': '../../vendor/jquery-ui/ui/minified/jquery-ui.min',
        'angular-bootstrap-slider': '../../vendor/angular-bootstrap-slider/slider',
        'seiyria-bootstrap-slider': '../../vendor/seiyria-bootstrap-slider/js/bootstrap-slider',
        modernizr: '../../vendor/modernizr/modernizr',
        'angular-xeditable': '../../vendor/angular-xeditable/dist/js/xeditable',
        'checklist-model': '../../vendor/checklist-model/checklist-model',
        ngInfiniteScroll: '../../vendor/ngInfiniteScroll/build/ng-infinite-scroll'
    },
    shim: {
        easel: {
            exports: 'createjs'
        },
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
        'angular-bootstrap': {
            deps: [
                'angular'
            ],
            exports: 'angular'
        },
        'angular-ui-slider': {
            deps: [
                'angular',
                'jquery',
                'jquery-ui'
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