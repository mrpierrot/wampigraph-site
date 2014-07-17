/**
 * The main requirejs configuration (except for baseUrl)
 *
 * This file is included in ::_requirejs.html.twig and in Gruntfile.js. The
 * baseUrl is not here so we can dynamically vary it in ::_requirejs.html.twig
 */
requirejs.config({
    baseUrl: '/assets/js',
    paths: {
        domReady: '../vendor/requirejs-domready/domReady',
        jquery: '../vendor/jquery/dist/jquery',
        bootstrap: '../vendor/components-bootstrap/js/bootstrap.min',
        angular: '../vendor/angular/angular',
        'angular-bootstrap': '../vendor/angular-bootstrap/ui-bootstrap-tpls',
        'angular-route': '../vendor/angular-route/angular-route',
        'components-bootstrap': '../vendor/components-bootstrap/js/bootstrap',
        easeljs: '../vendor/easeljs/lib/easeljs-0.7.1.combined',
        requirejs: '../vendor/requirejs/require',
        'requirejs-domready': '../vendor/requirejs-domready/domReady',
        app: './app'
    },
    shim: {
        bootstrap: [
            'jquery'
        ],
        angular: {
            exports: 'angular'
        },
        'angular-route': {
            deps: [
                'angular'
            ],
            exports: 'angular'
        }
    },
    packages: [

    ]
});

require(['app','require','angular','angular-route'], function (app) {
    app.init();
});
