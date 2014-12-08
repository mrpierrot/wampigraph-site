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

class User  implements ControllerProviderInterface{

    public  function  connect(Application $app){

        $controllers = $app['controllers_factory'];

        $controllers->before(function () use ($app){
            $token = $app['security']->getToken();
            if (null !== $token) {
                $user = $token->getUser();
                $app['user'] = $user;
                $app['twig']->addGlobal('user',$user);
            }
        });

        // routes de gestion du login


        $controllers->match('/activation-check','CasusLudi\\Controllers\\Auth::userActivationCheck','GET')->bind('user-activation-check');
        $controllers->match('/activation-status/{status}','CasusLudi\\Controllers\\Auth::userActivationStatus','GET')->bind('user-activation-status');


        return $controllers;

    }
} 