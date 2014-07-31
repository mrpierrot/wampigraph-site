<?php
/**
 * Created by PhpStorm.
 * User: Pierrot
 * Date: 14/01/14
 * Time: 15:47
 */

namespace CasusLudi\ControllerProviders;


use Silex\Application;
use Silex\ControllerProviderInterface;
use Symfony\Component\HttpFoundation\Request;

class Core  implements ControllerProviderInterface{

    public  function  connect(Application $app){

        $controllers = $app['controllers_factory'];
        $controllers->match('/creer','CasusLudi\\Controllers\\Core::painter','GET')
            ->bind('painter');

        $controllers->match('','CasusLudi\\Controllers\\Core::home','GET')
            ->bind('home');

        $controllers->match('/mes-motifs','CasusLudi\\Controllers\\Core::myPatterns','GET')
            ->bind('my-patterns');
        $controllers->match('/mes-wampums','CasusLudi\\Controllers\\Core::myWampums','GET')
            ->bind('my-wampums');




        $controllers->match('/login',function(Request $request) use ($app){

            return $app['twig']->render('core/login.html.twig', array(
                'error'         => $app['security.last_error']($request),
                'last_username' => $app['session']->get('_security.last_username'),
            ));
        })->bind('login');


        $controllers->match('/login-check',function() use ($app){

            return $app->redirect($app->path('home'));
        })->bind('admin_login_check');

        $controllers->match('/logout',function() use ($app){

            return $app->redirect($app->path('login'));
        })->bind('admin_logout');


        return $controllers;

    }
} 