<?php
/**
 * Created by PhpStorm.
 * User: Pierrot
 * Date: 16/12/13
 * Time: 15:25
 */

use Silex\Provider\TwigServiceProvider;
use Silex\Provider\DoctrineServiceProvider;
use Silex\Provider\SessionServiceProvider;
use Silex\Provider\FormServiceProvider;
use Silex\Provider\ValidatorServiceProvider;
use Silex\Provider\TranslationServiceProvider;
use Silex\Provider\SwiftmailerServiceProvider;



$app->register(new TwigServiceProvider(), array(
    'twig.options'        => array(
        'cache'            => isset($app['twig.options.cache']) ? $app['twig.options.cache'] : false,
        'strict_variables' => true
    ),
   // 'twig.form.templates' => array(__DIR__ .'/../vendor/silex-braincrafted-bootstrap/resources/views/form_div_layout.html.twig'),
    'twig.form.templates' => array('layouts/form_div_layout.html.twig'),
    'twig.path'           => array(__DIR__ . '/../resources/views'),
    'charset'=> 'utf8'
));

$app['twig'] = $app->share($app->extend('twig', function($twig) use ($app) {
    $twig->addExtension(new \Braincrafted\Bundle\BootstrapBundle\Twig\BootstrapBadgeExtension());
    $twig->addExtension(new \Braincrafted\Bundle\BootstrapBundle\Twig\BootstrapIconExtension());
    $twig->addExtension(new \Braincrafted\Bundle\BootstrapBundle\Twig\BootstrapLabelExtension());
    $twig->addExtension(new \Braincrafted\Bundle\BootstrapBundle\Twig\BootstrapFormExtension());

    $twig->addFunction(new Twig_SimpleFunction('wg_route_is_active', function ($route) use ($app) {
        return $route == $app['request']->attributes->get('_route') ?'active':'';
    }));
    return $twig;
}));

$app->register(new Silex\Provider\SecurityServiceProvider(),array(
    'security.firewalls' =>array(
        'login' => array(
            'pattern' => '^/login$',
        ),
        'external' => array(
            'pattern' => '^/external/.*$'
        ),
        'secured' => array(
            'pattern' => '^.*$',
            'form' => array('login_path' => '/login', 'check_path' => '/login-check'),
            'logout' => array('logout_path' => '/logout'),
            'users' =>  $app->share(function () use ($app) {
                    return new \CasusLudi\Providers\UserProvider($app['db']);
             })
        )
    ),
    'security.role_hierarchy' => $app['security.role_hierarchy'],
    'security.access_rules' => array(
        array('^/admin', 'ROLE_MODERATOR'),
        array('^/external', 'ROLE_EXTERNAL'),
        array('^.*$', 'ROLE_USER'),
    )
));

$app->register(new SessionServiceProvider());
$app->register(new DoctrineServiceProvider());
$app->register(new SwiftmailerServiceProvider());
$app->register(new FormServiceProvider());
$app->register(new ValidatorServiceProvider());
$app->register(new Silex\Provider\UrlGeneratorServiceProvider());
$app->register(new TranslationServiceProvider(), array(
    'translator.messages' => array(),
    'locale'=>'fr'
));



