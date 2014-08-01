<?php
/**
 * Created by PhpStorm.
 * User: Pierrot
 * Date: 15/01/14
 * Time: 12:17
 */

namespace CasusLudi\Controllers;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

class Auth {


    public function login(Request $request, Application $app){

        return $app['twig']->render('core/login.html.twig', array(
            'error'         => $app['security.last_error']($request),
            'last_username' => $app['session']->get('_security.last_username'),
        ));
    }

    public function loginCheck(Request $request, Application $app){

        return $app->redirect($app->path('home'));
    }

    public function logout(Request $request, Application $app){

        return $app->redirect($app->path('login'));
    }


} 