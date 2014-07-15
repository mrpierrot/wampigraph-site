<?php
/**
 * Created by PhpStorm.
 * User: Pierrot
 * Date: 16/12/13
 * Time: 15:26
 */

use Symfony\Component\HttpFoundation\Request;

$home = $app['controllers_factory'];

$app->mount('/',new CasusLudi\ControllerProviders\Front());
/*
$app->match('/login',function(Request $request) use ($app){

    return $app['twig']->render('admin/login.html.twig', array(
        'error'         => $app['security.last_error']($request),
        'last_username' => $app['session']->get('_security.last_username'),
    ));
});*/

$app->mount('/admin',new CasusLudi\ControllerProviders\Admin());
